// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-research",
          title: "research",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-vnc-virtual-desktop-on-a-headless-server",
        
          title: "VNC Virtual Desktop on a Headless Server",
        
        description: "Setup a virtual desktop environment on a Linux server without a monitor.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/headless-vnc/";
          
        },
      },{id: "post-creating-a-private-fork-of-a-github-repository",
        
          title: "Creating a Private Fork of a GitHub Repository",
        
        description: "Simple steps commands to create a private fork of a GitHub repository.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/git-private-forks/";
          
        },
      },{id: "post-open-source-julia-packages-for-first-order-optimization",
        
          title: "Open-source Julia packages for first-order optimization",
        
        description: "We present two Julia packages that the BlackRock AI Labs has released, PiecewiseQuadratics.jl and SeparableOptimization.jl, along with a new Julia organization we created that is dedicated to first-order optimization methods.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/julia-first-order/";
          
        },
      },{id: "post-make-the-time-to-go-to-the-doctor-even-if-you-feel-perfectly-healthy",
        
          title: "Make the time to go to the doctor, even if you feel perfectly...",
        
        description: "If you told me a year ago I would need open-heart surgery just after turning 25, I would have thought you were crazy. Just like most new college grads, I had felt healthy and invincible for as long as I could remember.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/make-time-for-the-doctor/";
          
        },
      },{id: "post-gender-inference-from-character-sequences-in-multinational-first-names",
        
          title: "Gender Inference from Character Sequences in Multinational First Names",
        
        description: "Accurate prediction of an unknown individual’s gender is desirable for use in marketing, social science, and many other applications in academia and industry. Perhaps the most obvious and telling indicator of a person’s gender is their first name.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/name2gender-introduction/";
          
        },
      },{id: "news-left-blackrock-ai-labs-to-pursue-a-master-s-degree-in-computer-science-at-cmu-bittersweet",
          title: 'Left BlackRock AI Labs to pursue a Master’s degree in Computer Science at...',
          description: "",
          section: "News",},{id: "news-awarded-the-intel-growing-the-legacy-scholarship-and-accepted-into-the-lighting-the-pathway-to-faculty-careers-program-through-aises-accepted-into-google-research-s-computer-science-mentorship-program",
          title: 'Awarded the Intel Growing The Legacy Scholarship and accepted into the Lighting the...',
          description: "",
          section: "News",},{id: "news-joined-prof-deepak-pathak-s-group-in-cmu-s-robotics-institute-and-will-focus-on-self-supervised-learning-and-curiosity-driven-exploration-in-computer-vision",
          title: 'Joined Prof. Deepak Pathak’s group in CMU’s Robotics Institute, and will focus on...',
          description: "",
          section: "News",},{id: "news-our-paper-internet-explorer-was-accepted-to-icml-2023-see-you-in-hawaii",
          title: 'Our paper Internet Explorer was accepted to ICML 2023!! See you in Hawaii...',
          description: "",
          section: "News",},{id: "news-defended-my-master-s-thesis-and-graduated-from-cmu",
          title: 'Defended my Master’s thesis and graduated from CMU!',
          description: "",
          section: "News",},{id: "news-excited-to-be-starting-my-phd-at-nyu-advised-by-profs-saining-xie-and-rob-fergus",
          title: 'Excited to be starting my PhD at NYU advised by Profs. Saining Xie...',
          description: "",
          section: "News",},{id: "news-i-will-be-joining-allenai-ai2-as-a-resesarch-intern-this-summer-in-seattle-working-with-ross-girshick",
          title: 'I will be joining AllenAI (AI2) as a Resesarch Intern this summer in...',
          description: "",
          section: "News",},{id: "news-thrilled-to-have-been-awarded-the-ndseg-fellowship-to-support-my-phd-research-at-nyu",
          title: 'Thrilled to have been awarded the NDSEG Fellowship to support my PhD research...',
          description: "",
          section: "News",},{id: "news-cambrian-was-accepted-to-neurips-2024-as-an-oral-presentation",
          title: 'Cambrian was accepted to NeurIPS 2024 as an oral presentation 🪼🎉',
          description: "",
          section: "News",},{id: "news-honored-to-be-recognized-as-a-cvpr-2025-outstanding-reviewer",
          title: 'Honored to be recognized as a CVPR 2025 Outstanding Reviewer!',
          description: "",
          section: "News",},{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/ellisbrown", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/ellislbrownii", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=Hp5uEnUAAAAJ", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/_ellisbrown", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
