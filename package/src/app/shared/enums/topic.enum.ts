export enum Topic {
  AI = 10,
  Angular = 20,
  BigData = 30,
  Blockchain = 40,
  C = 50,
  Cpp = 60,
  CSharp = 70,
  Cybersecurity = 80,
  DataScience = 90,
  DevOps = 100,
  DotNet = 110,
  Flutter = 120,
  Go = 130,
  IoT = 140,
  Java = 150,
  JavaScript = 160,
  Kotlin = 170,
  MachineLearning = 180,
  MobileDevelopment = 190,
  Python = 200,
  React = 210,
  Robotics = 220,
  Ruby = 230,
  Rust = 240,
  SoftwareArchitecture = 250,
  Swift = 260,
  Testing = 270,
  TypeScript = 280,
  WebDevelopment = 290,
}

export const TopicCustomMapping: { [key: number]: string } = {
  10: 'Artificial Intelligence',
  20: 'Angular Framework',
  30: 'Big Data Analytics',
  40: 'Blockchain Technology',
  50: 'C Programming',
  60: 'C++ Programming',
  70: 'C# Development',
  80: 'Cybersecurity Best Practices',
  90: 'Data Science Techniques',
  100: 'DevOps Tools',
  110: '.NET Framework',
  120: 'Flutter Mobile Development',
  130: 'Go Programming Language',
  140: 'Internet of Things (IoT)',
  150: 'Java Programming',
  160: 'JavaScript Ecosystem',
  170: 'Kotlin for Android',
  180: 'Machine Learning',
  190: 'Mobile App Development',
  200: 'Python for Data Science',
  210: 'React.js Frontend',
  220: 'Robotics Engineering',
  230: 'Ruby Programming',
  240: 'Rust Language',
  250: 'Software Architecture Patterns',
  260: 'Swift for iOS Development',
  270: 'Testing Methodologies',
  280: 'TypeScript Development',
  290: 'Web Development Trends',
};


export function getTopicName(value: number): string {
  return TopicCustomMapping[value];
}

export const topicColors: { [key: number]: string } = {
  10: '#ff6f61',  // Artificial Intelligence - Red
  20: '#42a5f5',  // Angular Framework - Blue
  30: '#7e57c2',  // Big Data Analytics - Purple
  40: '#66bb6a',  // Blockchain Technology - Green
  50: '#ef5350',  // C Programming - Light Red
  60: '#ab47bc',  // C++ Programming - Light Purple
  70: '#5c6bc0',  // C# Development - Indigo
  80: '#ffa726',  // Cybersecurity Best Practices - Orange
  90: '#8d6e63',  // Data Science Techniques - Brown
  100: '#78909c', // DevOps Tools - Grayish Blue
  110: '#1e88e5', // .NET Framework - Deep Blue
  120: '#7cb342', // Flutter Mobile Development - Light Green
  130: '#26a69a', // Go Programming Language - Teal
  140: '#ff7043', // Internet of Things (IoT) - Deep Orange
  150: '#fdd835', // Java Programming - Yellow
  160: '#fb8c00', // JavaScript Ecosystem - Amber
  170: '#ba68c8', // Kotlin for Android - Violet
  180: '#9ccc65', // Machine Learning - Light Green
  190: '#8e24aa', // Mobile App Development - Deep Purple
  200: '#4caf50', // Python for Data Science - Green
  210: '#2196f3', // React.js Frontend - Blue
  220: '#ff5722', // Robotics Engineering - Red-Orange
  230: '#d32f2f', // Ruby Programming - Dark Red
  240: '#607d8b', // Rust Language - Blue Gray
  250: '#3949ab', // Software Architecture Patterns - Dark Blue
  260: '#f06292', // Swift for iOS Development - Pink
  270: '#90a4ae', // Testing Methodologies - Light Grayish Blue
  280: '#039be5', // TypeScript Development - Cyan
  290: '#00acc1'  // Web Development Trends - Light Cyan
};



