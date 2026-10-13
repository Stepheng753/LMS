// Topic 1 artifacts: the shell aliases and the WSL settings saved during setup.
// Lessons import from here, and the Toolkit step offers the same text for download.

// "@{" stands in for "${" so shell variable syntax is not read as a JS template substitution.
export const ALIASES = String.raw`export COLOR_NC='0'
export COLOR_BLACK='0;30'
export COLOR_RED='0;31'
export COLOR_GREEN='0;32'
export COLOR_YELLOW='0;33'
export COLOR_BLUE='0;34'
export COLOR_MAGENTA='0;35'
export COLOR_CYAN='0;36'
export COLOR_WHITE='0;37'

# Bright versions
export COLOR_BRIGHT_BLACK='1;30'
export COLOR_BRIGHT_RED='1;31'
export COLOR_BRIGHT_GREEN='1;32'
export COLOR_BRIGHT_YELLOW='1;33'
export COLOR_BRIGHT_BLUE='1;34'
export COLOR_BRIGHT_MAGENTA='1;35'
export COLOR_BRIGHT_CYAN='1;36'
export COLOR_BRIGHT_WHITE='1;37'

# Background colors
export COLOR_BG_BLACK='40'
export COLOR_BG_RED='41'
export COLOR_BG_GREEN='42'
export COLOR_BG_YELLOW='43'
export COLOR_BG_BLUE='44'
export COLOR_BG_MAGENTA='45'
export COLOR_BG_CYAN='46'
export COLOR_BG_WHITE='47'

LS_COLORS=$LS_COLORS:'rs=0:di='@{COLOR_BRIGHT_YELLOW}':ln='@{COLOR_BRIGHT_CYAN}':ex='@{COLOR_BRIGHT_GREEN}
export LS_COLORS

PS1='\[\033['@{COLOR_BRIGHT_YELLOW}'m\][\d \t] '
PS1+='\[\033['@{COLOR_BRIGHT_CYAN}'m\]\u@\h: '
PS1+='\[\033['@{COLOR_BRIGHT_GREEN}'m\]\W '
PS1+='\[\033['@{COLOR_NC}'m\]'

alias cls='clear'
alias cls2='clear && clear'
alias CLS='clear'
alias ll='ls -lhX'
alias LL='ls -lhX'
alias la='ls -lha'

alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'
alias dir='dir --color=auto'
alias vdir='vdir --color=auto'

alias py='python3'
alias gs="git status"
alias ga="git add"
alias gc="git commit -m"`.split('@{').join('${');

export const WSLCONFIG = `[wsl2]
networkingMode=mirrored`;
