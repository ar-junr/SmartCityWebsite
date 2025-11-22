const navigation = [
    {
      name: 'Home',href:'/',
      dropdown: [
        { name: 'City Profile', href: '/city-profile' },
        { name: `What is a 'Smart City'`, href: '/smart-city-def' },
        { name: `About 'Smart City Mission'`, href: '/mission-about' },
        { name: 'Smart Cities Challenge', href: '/misson-challenge' },
        { name: 'Vision & Strategy', href: '/misson-vision' },
        { name: 'Project Milestones', href: '/project-milestone' },
      ],
    },
    {
      name: 'SCTL',href:'/sctl',
      dropdown: [
        { name: 'Special Purpose Vehicle', href: '/spv' },
        { name: 'Consultant (PMC)', href: '/pmc-consultant' },
        { name: 'Project Funds', href: '/funds' },
        { name: 'Financials', href: '/financials' },
      ],
    },
    {
      name: 'Projects',href:'/projects',
      dropdown: [
        /*{ name: 'ABD Projects', href: '/abd-project' },
        { name: 'Pancity Projects', href: '/pancity-project' },
        { name: 'Convergence Projects', href: '/convergence-project' },*/
        { name: 'CITIIS 2.0', href: '/citiis' },
        { name: 'MPR', href: '/mpr' },
        { name: 'Ongoing Projects', href: '/ongoing-project' },
        { name: 'Completed Projects', href: '/completed-project' },
        { name: 'SCTL Project', href: '/sctl-project' },
        { name: 'Benefiaciary Details', href: '/benefiaciary-details' },
      ],
    },
    {
      name: 'Tenders',href:'/tenders',
    },
    {
      name: 'Events',href:'/events',
      dropdown: [
        { name: 'News', href: '/news' },
        { name: 'Conclave', href: '/conclave' },
        { name: '8th Anniversary of Smartcity Mission', href: '/anniversary' },
        { name: 'Inauguration', href: '/inauguration' },
        { name: 'Ente Keralam', href: '/ente-keralam' },
      ],
    },
    {
      name: 'Gallery',href:'/gallery',
      dropdown: [
        { name: 'Photo Gallery', href: '/photo-gallery' },
        { name: 'Video Gallery', href: '/video-gallery' },
      ],
    },
    {
      name: 'Downloads',href:'/downloads',
      dropdown: [
        { name: `Government Order's(GO's)`, href: '/government-orders' },
      ],
    },
    {
      name: 'Careers',href:'/careers',
      dropdown: [
        { name: 'Internships', href: '/internships' },
        { name: 'Tulip internship', href: '/tulip-internship' },
      ],
    },
    {
      name: 'Contact Us',href:'/contact-us',
      dropdown: [
        { name: 'Register a Complaint', href: '/register-complaint' },
        { name: 'Poll', href: '/poll' },
        { name: 'RTI', href: '/rti' },
      ],
    },
  ];
export default navigation;