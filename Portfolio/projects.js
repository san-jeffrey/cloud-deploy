/**
 * Portfolio Data Configuration - San Jeffrey D
 * Cloud Engineering | DevOps | Cloud Infrastructure | IT Support
 */
const portfolioData = {
  personal: {
    name: "San Jeffrey D",
    role: "Aspiring Cloud & DevOps Engineer",
    roles: [
      "Junior DevOps Engineer",
      "Associate Cloud Engineer",
      "Junior Cloud Engineer",
      "Cloud Support Engineer",
      "Cloud Operations Engineer"
    ],
    status: "Open to Junior & Associate Cloud / DevOps Opportunities",
    location: "Kanyakumari, Tamil Nadu, India",
    careerGoal: "Building reliable, automated, and scalable cloud infrastructure through DevOps practices.",
    github: "https://github.com/san-jeffrey/cloud-deploy",
    linkedin: "https://www.linkedin.com/in/san-jeffrey-95a589354/",
    bio: "I am an Information Technology graduate building my career in Cloud Engineering and DevOps, with hands-on experience in IT support, system troubleshooting, Git, GitHub, Linux, Docker, AWS, and cloud infrastructure. I enjoy working with infrastructure, automation, containerization, deployment pipelines, and troubleshooting technical issues. I am continuously developing my skills in CI/CD, Infrastructure as Code, Kubernetes, and cloud technologies while building practical projects that simulate real-world DevOps environments.",
    stats: [
      { label: "Education", value: "B.Tech IT", number: 2025, suffix: " (May)" },
      { label: "AWS Academy Training", value: "60 Hrs", number: 60, suffix: " Hrs" },
      { label: "IT Support Experience", value: "8 Mos", number: 8, suffix: " Mos" },
      { label: "Hands-On Focus", value: "Cloud & DevOps", number: 100, suffix: "%" }
    ]
  },

  education: {
    degree: "Bachelor of Technology (B.Tech) in Information Technology",
    institution: "Saint Xavier's Catholic College of Engineering, Kanyakumari",
    graduation: "May 2025",
    description: "Solid academic foundation in computer networking, operating systems, software engineering, databases, and web technologies."
  },

  skills: [
    {
      category: "Cloud Computing & AWS",
      icon: "fa-solid fa-cloud",
      items: [
        { name: "Amazon Web Services (AWS)", level: 85, icon: "devicon-amazonwebservices-original colored" },
        { name: "Amazon EC2 & S3", level: 90, icon: "fa-solid fa-server" },
        { name: "AWS IAM & Security Groups", level: 85, icon: "fa-solid fa-user-shield" },
        { name: "AWS VPC & Networking", level: 80, icon: "fa-solid fa-network-wired" },
        { name: "AWS CloudWatch & Monitoring", level: 80, icon: "fa-solid fa-chart-line" },
        { name: "Cloud Infrastructure & Security", level: 82, icon: "fa-solid fa-shield-halved" }
      ]
    },
    {
      category: "Containers & Web Servers",
      icon: "fa-solid fa-box-archive",
      items: [
        { name: "Docker (Engine, Images, Containers)", level: 90, icon: "devicon-docker-plain colored" },
        { name: "Docker Compose (Multi-Service)", level: 88, icon: "devicon-docker-plain colored" },
        { name: "Docker Hub (Image Registry)", level: 88, icon: "fa-solid fa-cloud-arrow-up" },
        { name: "Nginx (Web Server & Reverse Proxy)", level: 85, icon: "devicon-nginx-original colored" },
        { name: "Containerization & Port Mapping", level: 90, icon: "fa-solid fa-cubes" }
      ]
    },
    {
      category: "DevOps, CI/CD & IaC",
      icon: "fa-solid fa-gears",
      items: [
        { name: "CI/CD & Deployment Pipelines", level: 82, icon: "fa-solid fa-code-branch" },
        { name: "GitHub Actions Automation", level: 80, icon: "devicon-githubactions-plain colored" },
        { name: "Infrastructure as Code (IaC)", level: 75, icon: "fa-solid fa-layer-group" },
        { name: "Terraform (Basics & Provisioning)", level: 72, icon: "devicon-terraform-plain colored" },
        { name: "Kubernetes (Fundamentals & Pods)", level: 70, icon: "devicon-kubernetes-plain colored" },
        { name: "Automation & Scripting", level: 80, icon: "fa-solid fa-terminal" }
      ]
    },
    {
      category: "Version Control & Scripting",
      icon: "fa-solid fa-code-compare",
      items: [
        { name: "Git & Git Branching Workflows", level: 90, icon: "devicon-git-plain colored" },
        { name: "GitHub Repository Management", level: 90, icon: "devicon-github-original" },
        { name: "Linux System Administration", level: 88, icon: "devicon-linux-plain colored" },
        { name: "Bash & Shell Scripting", level: 80, icon: "devicon-bash-plain colored" },
        { name: "YAML Configuration", level: 88, icon: "fa-solid fa-file-code" },
        { name: "Windows Administration", level: 90, icon: "devicon-windows8-original colored" }
      ]
    },
    {
      category: "Networking & Troubleshooting",
      icon: "fa-solid fa-network-wired",
      items: [
        { name: "TCP/IP, HTTP/HTTPS, DNS", level: 85, icon: "fa-solid fa-globe" },
        { name: "IP Addressing, Ports & Subnets", level: 85, icon: "fa-solid fa-ethernet" },
        { name: "SSH & Remote Administration", level: 88, icon: "fa-solid fa-key" },
        { name: "System & Network Troubleshooting", level: 90, icon: "fa-solid fa-wrench" },
        { name: "IT Hardware/Software Support", level: 92, icon: "fa-solid fa-desktop" }
      ]
    }
  ],

  projects: [
    {
      id: "cloud-deploy",
      title: "CloudDeploy – Cloud & DevOps Deployment Platform",
      category: "devops",
      badge: "Personal Project • In Progress",
      type: "Personal Project",
      status: "In Progress",
      featured: true,
      summary: "A practical cloud deployment project establishing a containerized workflow using Docker, Nginx, and Git/GitHub, actively evolving toward a complete automated CI/CD pipeline on AWS EC2.",
      description: "CloudDeploy demonstrates hands-on DevOps practices starting from source control to automated container deployment. The project currently runs containerized Nginx web applications using custom Docker images and Docker Compose for repeatable local deployments, with ongoing integration of GitHub Actions CI/CD to automate builds and deploy directly to an AWS EC2 instance.",
      currentArchitecture: "Developer ➔ Git ➔ GitHub ➔ Docker (Dockerfile) ➔ Docker Image ➔ Docker Container ➔ Nginx ➔ Web Application",
      plannedArchitecture: "Developer ➔ GitHub ➔ GitHub Actions CI/CD ➔ Docker Build ➔ Docker Hub ➔ AWS EC2 ➔ Docker Container ➔ Nginx ➔ Live Web Application",
      highlights: [
        "Source code version control using structured Git and GitHub branching.",
        "Containerization with custom Dockerfiles and optimized Docker images.",
        "Port mapping and container networking for reliable Nginx web serving.",
        "Docker Compose configuration for one-command repeatable deployments.",
        "Developing automated CI/CD workflows using GitHub Actions and Docker Hub.",
        "Simulating production deployment and troubleshooting on Linux and AWS EC2."
      ],
      tags: ["Docker", "Docker Compose", "Nginx", "Git", "GitHub", "Linux", "YAML", "AWS EC2", "GitHub Actions", "CI/CD"],
      metrics: ["Containerized Web Serving", "Port 8080:80 Mapped", "Automated Local Deploy"],
      github: "https://github.com/san-jeffrey/cloud-deploy",
      demo: "https://github.com/san-jeffrey/cloud-deploy",
      image: "assets/project-cicd.svg"
    },
    {
      id: "devops-hands-on-labs",
      title: "DevOps Learning & Hands-On Infrastructure",
      category: "cloud",
      badge: "Hands-On Practice",
      type: "Skill & Infrastructure Labs",
      status: "Continuous Practice",
      featured: true,
      summary: "Practical hands-on labs and exercises simulating real-world cloud environments across Linux administration, AWS infrastructure, Terraform, and Kubernetes.",
      description: "A continuous practical competency program focused on building applied knowledge through exercises and micro-projects. Covers essential Cloud & DevOps domains including server hardening, shell scripting, AWS core services, infrastructure automation with Terraform, container orchestration fundamentals with Kubernetes, and network troubleshooting.",
      currentArchitecture: "Hands-on Practice: Linux CLI ➔ Bash Scripts ➔ AWS (EC2/S3/VPC/IAM) ➔ Docker ➔ Terraform IaC ➔ Kubernetes Pods",
      plannedArchitecture: "Production Simulation: Multi-tier Infrastructure with Terraform ➔ GitHub Actions CI/CD ➔ K8s Deployment ➔ CloudWatch Monitoring",
      highlights: [
        "Linux System Administration: User management, file permissions, systemd services, SSH configuration, and process management.",
        "AWS Cloud Infrastructure: Provisioning EC2 instances, configuring Security Groups, S3 storage buckets, IAM roles/policies, and basic VPC networking.",
        "Scripting & Automation: Bash shell scripting for task automation, log analysis, and system health checks.",
        "Infrastructure as Code (IaC): Writing modular Terraform scripts to provision cloud resources reproducibly.",
        "Container Orchestration: Learning Kubernetes architecture, pods, deployments, services, and YAML manifests.",
        "Cloud Monitoring & Troubleshooting: Tracking server metrics with AWS CloudWatch and diagnosing networking issues (DNS, ping, traceroute, curl)."
      ],
      tags: ["AWS", "Linux", "Terraform", "Kubernetes", "Bash Scripting", "Networking", "CloudWatch", "Docker"],
      metrics: ["60+ Hrs Lab Training", "Hands-On AWS & Linux", "Real-World Troubleshooting"],
      github: "https://github.com/san-jeffrey/cloud-deploy",
      demo: "https://github.com/san-jeffrey/cloud-deploy",
      image: "assets/project-k8s.svg"
    }
  ],

  experience: [
    {
      role: "IT Support Executive",
      company: "Concord Consultancy Services",
      period: "September 2025 – April 2026",
      location: "On-site",
      type: "Professional Experience",
      description: "Provided comprehensive hardware, software, network, and system administration support across company workstations and office IT infrastructure.",
      responsibilities: [
        "Provided technical support to employees for hardware and software-related issues.",
        "Installed, configured, and maintained Windows operating systems and office applications.",
        "Troubleshot desktop, laptop, printer, and peripheral device issues.",
        "Installed and updated software required for daily business operations.",
        "Assisted with basic network and internet connectivity troubleshooting.",
        "Configured and maintained office computer systems and user accounts.",
        "Supported employees with day-to-day IT-related issues and technical assistance.",
        "Assisted with website-related tasks and other technical requirements.",
        "Maintained IT assets and ensured systems were operational.",
        "Coordinated with management to resolve technical issues efficiently."
      ],
      transferableSkills: [
        "System Troubleshooting & Root-Cause Diagnosis",
        "Windows & Linux System Administration",
        "Basic Networking (TCP/IP, DNS, Subnets, Routing)",
        "User Account & Access Management",
        "Hardware & Software Lifecycle Support",
        "Technical Problem Solving & User Communication"
      ]
    }
  ],

  certifications: [
    {
      title: "AWS Academy Graduate – AWS Academy Cloud Architecting",
      issuer: "AWS Academy (Amazon Web Services)",
      date: "Issued: April 15, 2025",
      duration: "60 Hours Course Duration",
      icon: "fa-brands fa-aws",
      badgeColor: "#FF9900",
      credlyUrl: "https://www.credly.com/go/x3OfPJyM",
      description: "Comprehensive 60-hour curriculum covering AWS cloud architecture, highly available infrastructure, EC2 compute, VPC networking, IAM security, S3 storage, auto-scaling, and database services."
    }
  ]
};
