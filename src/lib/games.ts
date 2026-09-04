export const categories = [
    { id: 'action', name: 'Action', icon: '⚔️' },
    { id: 'racing', name: 'Racing', icon: '🏎️' },
    { id: 'adventure', name: 'Adventure', icon: '🗺️' },
    { id: 'shooting', name: 'Shooting', icon: '🎯' },
    { id: 'arcade', name: 'Arcade', icon: '🕹️' },
];

export const games = [
    {
        id: 'slope',
        title: 'Slope',
        subtitle: 'Ultimate 3D Speed Run',
        category: 'Action',
        image: 'https://img.gamedistribution.com/8f04290afb7a43d88eed607b597847d1-512x384.jpeg',
        rating: '4.8',
        players: '2.4M',
        playUrl: 'https://slowroads.io/'
    },
    {
        id: 'vex-4',
        title: 'Vex 4',
        subtitle: 'Precision Platforming Challenge',
        category: 'Action',
        isNew: true,
        image: 'https://img.gamedistribution.com/80e6a5ae477f4d4fbcd1ea293d10087d-512x384.jpeg',
        rating: '4.7',
        players: '8.4M',
        playUrl: 'https://html5.gamedistribution.com/rvvASMiM/80e6a5ae477f4d4fbcd1ea293d10087d/index.html'
    },
    {
        id: 'rooftop-snipers',
        title: 'Rooftop Snipers',
        subtitle: '2-Player Sniper Showdown',
        category: 'Action',
        isNew: true,
        image: 'https://img.gamedistribution.com/c3a70ae98547407a92ebedca8b79fdfa-512x384.jpeg',
        rating: '4.6',
        players: '3.7M',
        playUrl: 'https://html5.gamedistribution.com/c3a70ae98547407a92ebedca8b79fdfa/'
    },
    {
        id: 'drift-boss',
        title: 'Drift Boss',
        subtitle: 'Master the Drift',
        category: 'Racing',
        image: 'https://img.gamedistribution.com/0a8b51e5eaee42e7b4db83ca00afc92e-512x384.jpeg',
        rating: '4.7',
        players: '3.1M',
        playUrl: 'https://html5.gamedistribution.com/0a8b51e5eaee42e7b4db83ca00afc92e/'
    },
    {
        id: 'moto-x3m',
        title: 'Moto X3M',
        subtitle: 'Extreme Bike Stunts',
        category: 'Racing',
        image: 'https://img.gamedistribution.com/5b0abd4c0faa4f5eb190a9a16d5a1b4c-512x384.jpeg',
        rating: '4.9',
        players: '1.8M',
        playUrl: 'https://html5.gamedistribution.com/5b0abd4c0faa4f5eb190a9a16d5a1b4c/'
    },
    {
        id: 'traffic-rider',
        title: 'Traffic Rider',
        subtitle: 'First-Person Highway Racing',
        category: 'Racing',
        isNew: true,
        image: 'https://img.gamedistribution.com/2c913ff625694c2fb4df4b63b3151331-512x384.jpeg',
        rating: '4.7',
        players: '4.2M',
        playUrl: 'https://html5.gamedistribution.com/2c913ff625694c2fb4df4b63b3151331/'
    },
    {
        id: 'gunspin',
        title: 'GunSpin',
        subtitle: 'Shoot & Fly Action',
        category: 'Shooting',
        image: 'https://img.gamedistribution.com/917cce8c44c44638a8cdc2a1794b65c8-512x384.jpeg',
        rating: '4.6',
        players: '1.5M',
        playUrl: 'https://html5.gamedistribution.com/917cce8c44c44638a8cdc2a1794b65c8/'
    },
    {
        id: 'zombie-shooter-3d',
        title: 'Zombie Shooter 3D',
        subtitle: 'Arm Up & Survive the Horde',
        category: 'Shooting',
        isNew: true,
        image: 'https://img.gamedistribution.com/b42d9c5983134c19a5a074eb78b40c31-512x384.jpeg',
        rating: '4.5',
        players: '2.1M',
        playUrl: 'https://html5.gamedistribution.com/b42d9c5983134c19a5a074eb78b40c31/'
    },
    {
        id: 'dead-target-zombie',
        title: 'Dead Target: Zombie Shooter',
        subtitle: 'Test Your Nerve Under Fire',
        category: 'Shooting',
        isNew: true,
        image: 'https://img.gamedistribution.com/b340afba827d473db55262fc7a9fa3f0-512x384.jpeg',
        rating: '4.6',
        players: '3.3M',
        playUrl: 'https://html5.gamedistribution.com/b340afba827d473db55262fc7a9fa3f0/'
    },
    {
        id: 'fireboy-watergirl',
        title: 'Fireboy & Watergirl',
        subtitle: 'Forest Temple Adventure',
        category: 'Adventure',
        image: '/ChatGPT Image Aug 27, 2026, 12_25_53 PM.png',
        rating: '4.8',
        players: '5.2M',
        playUrl: 'https://html5.gamedistribution.com/b86fa7bac3444977a0d2d980c2dd48eb/'
    },
    {
        id: 'tetra-quest',
        title: 'Tetra Quest',
        subtitle: 'Puzzle-Driven Dungeon Exploration',
        category: 'Adventure',
        isNew: true,
        image: 'https://img.gamedistribution.com/2a94fb7f28a242ee85b3fa390c55f00f-512x384.jpeg',
        rating: '4.5',
        players: '1.4M',
        playUrl: 'https://html5.gamedistribution.com/2a94fb7f28a242ee85b3fa390c55f00f/'
    },
    {
        id: 'super-billy-boy',
        title: 'Super Billy Boy',
        subtitle: 'Traps, Enemies & Platform Perils',
        category: 'Adventure',
        isNew: true,
        image: 'https://img.gamedistribution.com/9877166d28294d2f8615f31acc1267de-512x384.jpeg',
        rating: '4.4',
        players: '980K',
        playUrl: 'https://html5.gamedistribution.com/9877166d28294d2f8615f31acc1267de/'
    },
    {
        id: 'fruit-ninja',
        title: 'Fruit Ninja',
        subtitle: 'Slice & Dice Fruits',
        category: 'Arcade',
        image: '/Gemini_Generated_Image_aedw0baedw0baedw.png',
        rating: '4.5',
        players: '920K',
        playUrl: 'https://html5.gamedistribution.com/a186dc9ac7f548f884db8ff54df6dd9f/'
    },
    {
        id: 'bubble-shooter-hd',
        title: 'Bubble Shooter HD',
        subtitle: 'Match & Pop Colorful Bubbles',
        category: 'Arcade',
        isNew: true,
        image: 'https://img.gamedistribution.com/79a7db22af5f420eb9d56e28fffca87b-512x384.jpeg',
        rating: '4.6',
        players: '5.8M',
        playUrl: 'https://html5.gamedistribution.com/79a7db22af5f420eb9d56e28fffca87b/'
    },
    {
        id: 'cut-the-rope-3d',
        title: 'Cut The Rope 3D',
        subtitle: 'Snip, Swing & Solve Puzzles',
        category: 'Arcade',
        isNew: true,
        image: 'https://img.gamedistribution.com/6235e06233724bd6a680a379a545dea0-512x384.jpeg',
        rating: '4.5',
        players: '2.9M',
        playUrl: 'https://html5.gamedistribution.com/6235e06233724bd6a680a379a545dea0/'
    }
];