#!/usr/bin/env bash

# ==============================================================================
# LMS System Management Script
# Provides process control for the LMS application: start, stop, restart, status
# Dynamically tracks process by port and process matching (zero .pid files).
# ==============================================================================

set -e

# Resolve project root regardless of where the script is invoked from
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

LOG_DIR="$PROJECT_ROOT/logs"
LOG_FILE="$LOG_DIR/system.log"
DEFAULT_PORT=5173

# Color output definitions
COLOR_RESET="\033[0m"
COLOR_BOLD="\033[1m"
COLOR_GREEN="\033[32m"
COLOR_YELLOW="\033[33m"
COLOR_RED="\033[31m"
COLOR_CYAN="\033[36m"

# ------------------------------------------------------------------------------
# Helper: Print styled messages
# ------------------------------------------------------------------------------
info() {
  echo -e "${COLOR_CYAN}[INFO]${COLOR_RESET} $1"
}

success() {
  echo -e "${COLOR_GREEN}[SUCCESS]${COLOR_RESET} $1"
}

warn() {
  echo -e "${COLOR_YELLOW}[WARN]${COLOR_RESET} $1"
}

error() {
  echo -e "${COLOR_RED}[ERROR]${COLOR_RESET} $1" >&2
}

# ------------------------------------------------------------------------------
# Helper: Find active process IDs by port or name (No PID file used)
# ------------------------------------------------------------------------------
get_pids() {
  local pids=""

  # 1. Primary check: process listening on the target port via lsof
  if command -v lsof >/dev/null 2>&1; then
    pids=$(lsof -ti :"$DEFAULT_PORT" 2>/dev/null || true)
  fi

  # 2. Fallback check: fuser
  if [ -z "$pids" ] && command -v fuser >/dev/null 2>&1; then
    pids=$(fuser "$DEFAULT_PORT"/tcp 2>/dev/null | tr -s ' ' '\n' | grep -v '^$' || true)
  fi

  # 3. Fallback check: pgrep matching vite with port
  if [ -z "$pids" ]; then
    pids=$(pgrep -f "vite.*--port $DEFAULT_PORT" 2>/dev/null || true)
  fi

  # 4. Fallback check: pgrep matching vite within this repo
  if [ -z "$pids" ]; then
    pids=$(pgrep -f "vite" 2>/dev/null || true)
  fi

  # Normalize output (space-separated unique list of PIDs)
  if [ -n "$pids" ]; then
    echo "$pids" | tr '\n' ' ' | xargs
  fi
}

is_running() {
  local pids
  pids=$(get_pids)
  [ -n "$pids" ]
}

# ------------------------------------------------------------------------------
# Command: --start
# ------------------------------------------------------------------------------
start_app() {
  echo -e "${COLOR_BOLD}Starting LMS Application...${COLOR_RESET}"

  if is_running; then
    local current_pids
    current_pids=$(get_pids)
    warn "LMS is already running on port ${DEFAULT_PORT} (PID: ${current_pids})."
    return 0
  fi

  # Create logs directory if missing
  mkdir -p "$LOG_DIR"

  # Check for node_modules
  if [ ! -d "$PROJECT_ROOT/node_modules" ]; then
    warn "node_modules directory not detected. Running 'npm install' first..."
    (cd "$PROJECT_ROOT" && npm install)
  fi

  # Start Vite development server in the background
  info "Launching Vite server on port ${DEFAULT_PORT}..."
  cd "$PROJECT_ROOT"
  nohup npm run dev -- --host --port "$DEFAULT_PORT" >> "$LOG_FILE" 2>&1 &
  local started_pid=$!

  # Allow process a moment to initialize and bind the port
  sleep 2

  local active_pids
  active_pids=$(get_pids)
  if [ -n "$active_pids" ] || kill -0 "$started_pid" 2>/dev/null; then
    success "LMS started successfully!"
    echo -e "  ${COLOR_BOLD}PID:${COLOR_RESET}      ${active_pids:-$started_pid}"
    echo -e "  ${COLOR_BOLD}URL:${COLOR_RESET}      http://localhost:${DEFAULT_PORT}"
    echo -e "  ${COLOR_BOLD}Log:${COLOR_RESET}      ${LOG_FILE}"
  else
    error "LMS failed to start. Check log file for details: ${LOG_FILE}"
    exit 1
  fi
}

# ------------------------------------------------------------------------------
# Command: --stop
# ------------------------------------------------------------------------------
stop_app() {
  echo -e "${COLOR_BOLD}Stopping LMS Application...${COLOR_RESET}"

  local pids
  pids=$(get_pids)

  if [ -z "$pids" ]; then
    warn "LMS is not currently running on port ${DEFAULT_PORT}."
    return 0
  fi

  info "Terminating LMS process(es): ${pids}..."
  for pid in $pids; do
    kill "$pid" 2>/dev/null || true
  done

  # Wait up to 5 seconds for processes to cleanly exit
  local count=0
  while is_running && [ $count -lt 5 ]; do
    sleep 1
    count=$((count + 1))
  done

  # Force kill if still holding the port
  if is_running; then
    warn "Process did not terminate gracefully; issuing SIGKILL..."
    pids=$(get_pids)
    for pid in $pids; do
      kill -9 "$pid" 2>/dev/null || true
    done
  fi

  success "LMS process stopped."
}

# ------------------------------------------------------------------------------
# Command: --restart
# ------------------------------------------------------------------------------
restart_app() {
  echo -e "${COLOR_BOLD}Restarting LMS Application...${COLOR_RESET}"
  stop_app
  sleep 1
  start_app
}

# ------------------------------------------------------------------------------
# Command: --status
# ------------------------------------------------------------------------------
status_app() {
  echo -e "${COLOR_BOLD}Checking LMS Status...${COLOR_RESET}"

  local pids
  pids=$(get_pids)

  if [ -n "$pids" ]; then
    success "LMS is ACTIVE (Running)"
    echo -e "  ${COLOR_BOLD}PID:${COLOR_RESET}       ${pids}"
    echo -e "  ${COLOR_BOLD}URL:${COLOR_RESET}       http://localhost:${DEFAULT_PORT}"
    echo -e "  ${COLOR_BOLD}Log File:${COLOR_RESET}  ${LOG_FILE}"

    if [ -f "$LOG_FILE" ]; then
      echo -e "\n${COLOR_BOLD}Recent Log Output (last 5 lines):${COLOR_RESET}"
      tail -n 5 "$LOG_FILE"
    fi
  else
    echo -e "${COLOR_RED}● LMS is INACTIVE (Stopped)${COLOR_RESET}"
    return 1
  fi
}

# ------------------------------------------------------------------------------
# Command: --help
# ------------------------------------------------------------------------------
show_help() {
  echo -e "${COLOR_BOLD}LMS Process Control Utility${COLOR_RESET}"
  echo "Usage: $0 [OPTION]"
  echo ""
  echo "Options:"
  echo "  --start       Start the LMS Vite server in the background"
  echo "  --stop        Stop the running LMS server"
  echo "  --restart     Restart the LMS server"
  echo "  --status      Display current running state, PID, and recent logs"
  echo "  --help        Display this help message and exit"
  echo ""
  echo "Examples:"
  echo "  ./scripts/system.sh --start"
  echo "  ./scripts/system.sh --status"
  echo "  ./scripts/system.sh --stop"
}

# ------------------------------------------------------------------------------
# Argument Routing
# ------------------------------------------------------------------------------
case "$1" in
  --start)
    start_app
    ;;
  --stop)
    stop_app
    ;;
  --restart)
    restart_app
    ;;
  --status)
    status_app
    ;;
  --help|-h|"")
    show_help
    ;;
  *)
    error "Unknown option: $1"
    echo ""
    show_help
    exit 1
    ;;
esac
