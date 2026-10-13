import Step1_0_Welcome from './content/topic1_setup/step1.0_welcome';
import Step1_1_Vocabulary from './content/topic1_setup/step1.1_vocabulary';
import Step1_2_Wsl from './content/topic1_setup/step1.2_wsl';
import Step1_3_Ide from './content/topic1_setup/step1.3_ide';
import Step1_4_Agy from './content/topic1_setup/step1.4_agy';
import Step1_5_Navigating from './content/topic1_setup/step1.5_navigating';
import Step1_6_Making from './content/topic1_setup/step1.6_making';
import Step1_7_CopyMoveDelete from './content/topic1_setup/step1.7_copy_move_delete';
import Step1_8_ReadingEditing from './content/topic1_setup/step1.8_reading_editing';
import Step1_9_Installing from './content/topic1_setup/step1.9_installing';
import Step1_10_Aliases from './content/topic1_setup/step1.10_aliases';
import Step1_11_Checkpoint from './content/topic1_setup/step1.11_checkpoint';
import Step1_12_CheatSheet from './content/topic1_setup/step1.12_cheatsheet';
import Step2_0_BigPicture from './content/topic2_fullstack/step2.0_big_picture';
import Step2_1_Api from './content/topic2_fullstack/step2.1_api';
import Step2_2_Databases from './content/topic2_fullstack/step2.2_databases';
import Step2_3_Toolchain from './content/topic2_fullstack/step2.3_toolchain';
import Step2_4_RulesSkills from './content/topic2_fullstack/step2.4_rules_skills';
import Step2_5_Layout from './content/topic2_fullstack/step2.5_layout';
import Step2_6_WebsiteDesign from './content/topic2_fullstack/step2.6_website_design';
import Step2_7_Frontend from './content/topic2_fullstack/step2.7_frontend';
import Step2_8_SystemScript from './content/topic2_fullstack/step2.8_system_script';
import Step2_9_PlanSpec from './content/topic2_fullstack/step2.9_plan_spec';
import Step2_10_ReviewPlan from './content/topic2_fullstack/step2.10_review_plan';
import Step2_11_ProjectPortfolio from './content/topic2_fullstack/step2.11_project_portfolio';
import Step2_12_Backend from './content/topic2_fullstack/step2.12_backend';
import Step2_13_Connecting from './content/topic2_fullstack/step2.13_connecting';
import Step2_14_Testing from './content/topic2_fullstack/step2.14_testing';
import Step2_15_ProjectFullApp from './content/topic2_fullstack/step2.15_project_fullapp';
import Step2_16_CheatSheet from './content/topic2_fullstack/step2.16_cheatsheet';
import Step3_0_Welcome from './content/topic3_homelab/step3.0_welcome';
import Step3_1_SelfHosting from './content/topic3_homelab/step3.1_selfhosting';
import Step3_2_Internet from './content/topic3_homelab/step3.2_internet';
import Step3_3_Addresses from './content/topic3_homelab/step3.3_addresses';
import Step3_4_Git from './content/topic3_homelab/step3.4_git';
import Step3_5_GitHub from './content/topic3_homelab/step3.5_github';
import Step3_6_UbuntuServer from './content/topic3_homelab/step3.6_ubuntu_server';
import Step3_7_FixedAddress from './content/topic3_homelab/step3.7_fixed_address';
import Step3_8_Ssh from './content/topic3_homelab/step3.8_ssh';
import Step3_9_Hardening from './content/topic3_homelab/step3.9_hardening';
import Step3_10_Tailscale from './content/topic3_homelab/step3.10_tailscale';
import Step3_11_ServerUpkeep from './content/topic3_homelab/step3.11_server_upkeep';
import Step3_12_Containers from './content/topic3_homelab/step3.12_containers';
import Step3_13_DockerInstall from './content/topic3_homelab/step3.13_docker_install';
import Step3_14_Containerize from './content/topic3_homelab/step3.14_containerize';
import Step3_15_Dns from './content/topic3_homelab/step3.15_dns';
import Step3_16_Nginx from './content/topic3_homelab/step3.16_nginx';
import Step3_17_Ssl from './content/topic3_homelab/step3.17_ssl';
import Step3_18_GoingPublic from './content/topic3_homelab/step3.18_going_public';
import Step3_19_Jellyfin from './content/topic3_homelab/step3.19_jellyfin';
import Step3_20_Immich from './content/topic3_homelab/step3.20_immich';
import Step3_21_Nextcloud from './content/topic3_homelab/step3.21_nextcloud';
import Step3_22_Backups from './content/topic3_homelab/step3.22_backups';
import Step3_23_CicdSecrets from './content/topic3_homelab/step3.23_cicd_secrets';
import Step3_24_DeployYml from './content/topic3_homelab/step3.24_deploy_yml';
import Step3_25_ProjectShipIt from './content/topic3_homelab/step3.25_project_ship_it';
import Step3_26_CheatSheet from './content/topic3_homelab/step3.26_cheatsheet';
import StepF_0_Toolkit from './content/topic_final_toolkit/stepF.0_toolkit';
import StepF_1_NewMachine from './content/topic_final_toolkit/stepF.1_new_machine';
import { ModuleDefinition } from '../../types/lms';

export const sweModule: ModuleDefinition = {
  id: 'SWE',
  slug: 'swe',
  title: 'Software Engineering',
  category: 'Systems & Shell Mastery',
  description:
    'Set up a developer machine, get comfortable in the terminal, then learn to plan, build and automate real software with AI.',
  icon: 'Terminal',
  badge: 'Core Track',
  difficulty: 'Beginner',
  stages: [
    {
      id: 'swe-stage-1',
      title: 'Topic 1: Setup + Bash',
      description: 'Install your tools and learn to work in the terminal.',
      steps: [
        {
          id: 'swe-1-0',
          order: '1.0',
          title: 'Welcome & How to Learn Here',
          description: 'What the course covers, why the terminal, and how to use your AI helper.',
          estimatedMinutes: 6,
          component: Step1_0_Welcome,
        },
        {
          id: 'swe-1-1',
          order: '1.1',
          title: 'Vocabulary',
          description: 'The terms you will hear, in plain language.',
          estimatedMinutes: 8,
          component: Step1_1_Vocabulary,
        },
        {
          id: 'swe-1-2',
          order: '1.2',
          title: 'Install WSL',
          description: 'Run Ubuntu inside Windows 11 and enable mirrored networking.',
          estimatedMinutes: 15,
          component: Step1_2_Wsl,
        },
        {
          id: 'swe-1-3',
          order: '1.3',
          title: 'Antigravity IDE',
          description: 'Install the editor and connect it to WSL.',
          estimatedMinutes: 12,
          component: Step1_3_Ide,
        },
        {
          id: 'swe-1-4',
          order: '1.4',
          title: 'Agy: Your Terminal Helper',
          description: 'Install the AI assistant that works inside the terminal.',
          estimatedMinutes: 10,
          component: Step1_4_Agy,
        },
        {
          id: 'swe-1-5',
          order: '1.5',
          title: 'Getting Around',
          description: 'pwd, ls, cd, and the shortcuts that save time.',
          estimatedMinutes: 15,
          component: Step1_5_Navigating,
        },
        {
          id: 'swe-1-6',
          order: '1.6',
          title: 'Making Folders & Files',
          description: 'mkdir and touch.',
          estimatedMinutes: 10,
          component: Step1_6_Making,
        },
        {
          id: 'swe-1-7',
          order: '1.7',
          title: 'Copy, Move, Rename & Delete',
          description: 'cp, mv, rm, and how to delete safely.',
          estimatedMinutes: 12,
          component: Step1_7_CopyMoveDelete,
        },
        {
          id: 'swe-1-8',
          order: '1.8',
          title: 'Reading & Editing Files',
          description: 'cat, head, tail, echo and the nano survival kit.',
          estimatedMinutes: 15,
          component: Step1_8_ReadingEditing,
        },
        {
          id: 'swe-1-9',
          order: '1.9',
          title: 'Installing Software',
          description: 'sudo and apt.',
          estimatedMinutes: 10,
          component: Step1_9_Installing,
        },
        {
          id: 'swe-1-10',
          order: '1.10',
          title: 'Customise Your Terminal',
          description: 'Install your aliases and a colourful prompt.',
          estimatedMinutes: 10,
          component: Step1_10_Aliases,
        },
        {
          id: 'swe-1-11',
          order: '1.11',
          title: 'Checkpoint Project',
          description: 'Prove you can do everything in Topic 1.',
          estimatedMinutes: 25,
          component: Step1_11_Checkpoint,
        },
        {
          id: 'swe-1-12',
          order: '1.12',
          title: 'Topic 1 Cheat Sheet',
          description: 'One-page reference for the whole topic.',
          estimatedMinutes: 5,
          component: Step1_12_CheatSheet,
        },
      ],
    },
    {
      id: 'swe-stage-2',
      title: 'Topic 2: File Architecture + Spec-Driven Full Stack',
      description: 'Design, plan and build a portfolio website and a full app with FastAPI, React and SQLite.',
      steps: [
        {
          id: 'swe-2-0',
          order: '2.0',
          title: 'The Big Picture',
          description: 'How frontend, backend and database fit together.',
          estimatedMinutes: 8,
          component: Step2_0_BigPicture,
        },
        {
          id: 'swe-2-1',
          order: '2.1',
          title: 'What Is an API?',
          description: 'Requests, methods, JSON and status codes.',
          estimatedMinutes: 12,
          component: Step2_1_Api,
        },
        {
          id: 'swe-2-2',
          order: '2.2',
          title: 'Databases & Tables',
          description: 'Tables, value types, and how to split data across tables.',
          estimatedMinutes: 15,
          component: Step2_2_Databases,
        },
        {
          id: 'swe-2-3',
          order: '2.3',
          title: 'Install the Toolchain',
          description: 'Python, Node, sqlite3 and the database viewer.',
          estimatedMinutes: 15,
          component: Step2_3_Toolchain,
        },
        {
          id: 'swe-2-4',
          order: '2.4',
          title: 'Teaching Your AI: Rules & Skills',
          description: 'Save your standards so every project follows them.',
          estimatedMinutes: 15,
          component: Step2_4_RulesSkills,
        },
        {
          id: 'swe-2-5',
          order: '2.5',
          title: 'The Universal Repo Layout',
          description: 'The folder map and the 7-README convention.',
          estimatedMinutes: 15,
          component: Step2_5_Layout,
        },
        {
          id: 'swe-2-6',
          order: '2.6',
          title: 'Websites Are Rectangles in Rectangles',
          description: 'Sketch and describe any page as nested boxes.',
          estimatedMinutes: 15,
          component: Step2_6_WebsiteDesign,
        },
        {
          id: 'swe-2-7',
          order: '2.7',
          title: 'Frontend: React + Vite + Tailwind + TS',
          description: 'Components, Tailwind classes and fetching data.',
          estimatedMinutes: 15,
          component: Step2_7_Frontend,
        },
        {
          id: 'swe-2-8',
          order: '2.8',
          title: 'One Script To Run Everything',
          description: 'Never type npm again: scripts/system.sh, round 1.',
          estimatedMinutes: 12,
          component: Step2_8_SystemScript,
        },
        {
          id: 'swe-2-9',
          order: '2.9',
          title: '/plan: Writing the Spec',
          description: 'Describe what you want before any code exists.',
          estimatedMinutes: 15,
          component: Step2_9_PlanSpec,
        },
        {
          id: 'swe-2-10',
          order: '2.10',
          title: 'Reviewing the Plan',
          description: 'Read it all, check it, comment, then approve.',
          estimatedMinutes: 15,
          component: Step2_10_ReviewPlan,
        },
        {
          id: 'swe-2-11',
          order: '2.11',
          title: 'Project A: Portfolio Website',
          description: 'Build and run your own site end to end.',
          estimatedMinutes: 60,
          component: Step2_11_ProjectPortfolio,
        },
        {
          id: 'swe-2-12',
          order: '2.12',
          title: 'Backend: FastAPI, JSON Config & SQLite',
          description: 'The kitchen and the pantry, plus system.sh round 2.',
          estimatedMinutes: 25,
          component: Step2_12_Backend,
        },
        {
          id: 'swe-2-13',
          order: '2.13',
          title: 'Putting It All Together',
          description: 'Trace one click end to end and debug when it breaks.',
          estimatedMinutes: 15,
          component: Step2_13_Connecting,
        },
        {
          id: 'swe-2-14',
          order: '2.14',
          title: 'Three Layers of Testing',
          description: 'Unit, system and manual tests.',
          estimatedMinutes: 15,
          component: Step2_14_Testing,
        },
        {
          id: 'swe-2-15',
          order: '2.15',
          title: 'Project B: Your Full App',
          description: 'Frontend, backend and database from your own idea.',
          estimatedMinutes: 90,
          component: Step2_15_ProjectFullApp,
        },
        {
          id: 'swe-2-16',
          order: '2.16',
          title: 'Topic 2 Cheat Sheet',
          description: 'One-page reference for the whole topic.',
          estimatedMinutes: 5,
          component: Step2_16_CheatSheet,
        },
      ],
    },
    {
      id: 'swe-stage-3',
      title: 'Topic 3: Homelab + Pipelines',
      description: 'Run your own server, put your apps and open-source services on it, and deploy automatically.',
      steps: [
        {
          id: 'swe-3-0',
          order: '3.0',
          title: 'Welcome to the Homelab',
          description: 'What you will build and what you need.',
          estimatedMinutes: 8,
          component: Step3_0_Welcome,
        },
        {
          id: 'swe-3-1',
          order: '3.1',
          title: 'What Is Self-Hosted Open Source?',
          description: 'Open source, self-hosting, and the trade-offs.',
          estimatedMinutes: 10,
          component: Step3_1_SelfHosting,
        },
        {
          id: 'swe-3-2',
          order: '3.2',
          title: 'How the Internet Works',
          description: 'From typing a URL to the page on screen.',
          estimatedMinutes: 20,
          component: Step3_2_Internet,
        },
        {
          id: 'swe-3-3',
          order: '3.3',
          title: 'Addresses: IPs, Ports & Your Network',
          description: 'Private vs public, NAT, ports, and why we avoid port forwarding.',
          estimatedMinutes: 15,
          component: Step3_3_Addresses,
        },
        {
          id: 'swe-3-4',
          order: '3.4',
          title: 'Git: A Save Button With Memory',
          description: 'Commits, .gitignore, and your gs/ga/gc aliases.',
          estimatedMinutes: 20,
          component: Step3_4_Git,
        },
        {
          id: 'swe-3-5',
          order: '3.5',
          title: 'GitHub: Your Code, Off the Laptop',
          description: 'SSH keys, a private repository, and your first push.',
          estimatedMinutes: 20,
          component: Step3_5_GitHub,
        },
        {
          id: 'swe-3-6',
          order: '3.6',
          title: 'Install Ubuntu Server on the Old Laptop',
          description: 'Bootable USB, the installer, and keeping the lid shut.',
          estimatedMinutes: 30,
          component: Step3_6_UbuntuServer,
        },
        {
          id: 'swe-3-7',
          order: '3.7',
          title: 'Give the Server a Fixed Address',
          description: 'A DHCP reservation in your router.',
          estimatedMinutes: 12,
          component: Step3_7_FixedAddress,
        },
        {
          id: 'swe-3-8',
          order: '3.8',
          title: 'SSH: Control the Server Remotely',
          description: 'ssh-copy-id and ~/.ssh/config.',
          estimatedMinutes: 15,
          component: Step3_8_Ssh,
        },
        {
          id: 'swe-3-9',
          order: '3.9',
          title: 'Locking It Down',
          description: 'No passwords, and the ufw firewall.',
          estimatedMinutes: 20,
          component: Step3_9_Hardening,
        },
        {
          id: 'swe-3-10',
          order: '3.10',
          title: 'Tailscale: Reach Home From Anywhere',
          description: 'A private network with no open router ports.',
          estimatedMinutes: 20,
          component: Step3_10_Tailscale,
        },
        {
          id: 'swe-3-11',
          order: '3.11',
          title: 'Keeping a Server Healthy',
          description: 'Updates, logs and the five health commands.',
          estimatedMinutes: 15,
          component: Step3_11_ServerUpkeep,
        },
        {
          id: 'swe-3-12',
          order: '3.12',
          title: 'Containers: The Idea',
          description: 'Images, containers, volumes and ports.',
          estimatedMinutes: 12,
          component: Step3_12_Containers,
        },
        {
          id: 'swe-3-13',
          order: '3.13',
          title: 'Install Docker & Look Around',
          description: 'Docker Engine, Compose and the inspection commands.',
          estimatedMinutes: 20,
          component: Step3_13_DockerInstall,
        },
        {
          id: 'swe-3-14',
          order: '3.14',
          title: 'Containerize Your Full App',
          description: 'Dockerfiles, compose, and getting the code onto the server.',
          estimatedMinutes: 40,
          component: Step3_14_Containerize,
        },
        {
          id: 'swe-3-15',
          order: '3.15',
          title: 'DNS: How Names Find Servers',
          description: 'Hostinger, Cloudflare, records, and DNS vs DDNS.',
          estimatedMinutes: 25,
          component: Step3_15_Dns,
        },
        {
          id: 'swe-3-16',
          order: '3.16',
          title: 'nginx: The Front Door',
          description: 'A reverse proxy on the host, one site file per name.',
          estimatedMinutes: 25,
          component: Step3_16_Nginx,
        },
        {
          id: 'swe-3-17',
          order: '3.17',
          title: 'HTTPS: The Padlock',
          description: 'Let\'s Encrypt with the Cloudflare DNS challenge.',
          estimatedMinutes: 25,
          component: Step3_17_Ssl,
        },
        {
          id: 'swe-3-18',
          order: '3.18',
          title: 'Going Public (Optional)',
          description: 'DDNS, port forwarding and the risks.',
          estimatedMinutes: 20,
          component: Step3_18_GoingPublic,
        },
        {
          id: 'swe-3-19',
          order: '3.19',
          title: 'The Self-Hosting Pattern, and Jellyfin',
          description: 'The recipe for any app, with Jellyfin.',
          estimatedMinutes: 25,
          component: Step3_19_Jellyfin,
        },
        {
          id: 'swe-3-20',
          order: '3.20',
          title: 'Immich: Your Own Photo Library',
          description: 'Phone backup, albums and search on your own disk.',
          estimatedMinutes: 30,
          component: Step3_20_Immich,
        },
        {
          id: 'swe-3-21',
          order: '3.21',
          title: 'Nextcloud: Your Own Cloud Drive',
          description: 'Files, sync, calendar and contacts.',
          estimatedMinutes: 30,
          component: Step3_21_Nextcloud,
        },
        {
          id: 'swe-3-22',
          order: '3.22',
          title: 'Backups: Don\'t Lose Your Photos',
          description: '3-2-1, a backup drive, a script and a restore test.',
          estimatedMinutes: 30,
          component: Step3_22_Backups,
        },
        {
          id: 'swe-3-23',
          order: '3.23',
          title: 'CI/CD and Secrets',
          description: 'Pipelines, Tailscale for the runner, and GitHub secrets.',
          estimatedMinutes: 25,
          component: Step3_23_CicdSecrets,
        },
        {
          id: 'swe-3-24',
          order: '3.24',
          title: 'The Pipeline: deploy.yml',
          description: 'Read the workflow, ship, and roll back.',
          estimatedMinutes: 25,
          component: Step3_24_DeployYml,
        },
        {
          id: 'swe-3-25',
          order: '3.25',
          title: 'Project C: Ship It',
          description: 'Your full app live on your own domain, deploying on push.',
          estimatedMinutes: 90,
          component: Step3_25_ProjectShipIt,
        },
        {
          id: 'swe-3-26',
          order: '3.26',
          title: 'Topic 3 Cheat Sheet',
          description: 'One-page reference for the whole topic.',
          estimatedMinutes: 5,
          component: Step3_26_CheatSheet,
        },
      ],
    },
    {
      id: 'swe-stage-final',
      title: 'Final: Your Toolkit',
      description: 'Download every rule, skill, template and setting you built, and set up any machine from them.',
      steps: [
        {
          id: 'swe-final-0',
          order: 'F.0',
          title: 'Download Your Toolkit',
          description: 'Every rule, skill, template and setting in one place.',
          estimatedMinutes: 5,
          component: StepF_0_Toolkit,
        },
        {
          id: 'swe-final-1',
          order: 'F.1',
          title: 'Setting Up a New Machine',
          description: 'From a fresh PC to your full setup with the toolkit.',
          estimatedMinutes: 15,
          component: StepF_1_NewMachine,
        },
      ],
    },
  ],
};
