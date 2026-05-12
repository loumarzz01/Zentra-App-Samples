import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";


export default function Home() {

  const router = useRouter()

  const generateRandomTime = () => {
    const times = ['days', 'weeks', 'months'];
    const min = 1;
    const max = 12;

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomUnit = times[Math.floor(Math.random() * times.length)];

    

    return `${randomNumber} ${randomUnit} ago`;
  };

  const generateRandomViews = () => {
    const isMillions = Math.random() > 0.7;
    let randomNumber;
    let unit;

    if (isMillions) {
      randomNumber = Math.floor(Math.random() * 10) + 1;
      unit = 'M';
    } else {
      randomNumber = Math.floor(Math.random() * 999) + 1;
      unit = 'K';
    }

    return `${randomNumber}${unit} views`;
  };

  const [nicheKeywords, setNicheKeywords] = useState({
  Gaming: [
    "Minecraft", "Elden Ring", "Speedrunning", "Roblox", "GTA 6", 
    "Competitive Valorant", "Stardew Valley", "The Sims 4", "Retro Gaming", 
    "Steam Deck", "League of Legends", "Indie Games"
  ],
  Tech: [
    "Coding", "AI Agents", "Apple Vision Pro", "JavaScript", "iPhone 17", 
    "Android 16", "Custom PC Building", "Cybersecurity", "SaaS", 
    "Neuralink", "Web3", "Quantum Computing"
  ],
  Fitness: [
    "Fat Loss", "Bench Pressing", "Home Workouts", "Yoga", "Bodybuilding", 
    "Hyrox Training", "Marathon Prep", "Calisthenics", "Protein Prep", 
    "Intermittent Fasting", "Pilates", "Muscle Recovery"
  ],
  Finance: [
    "Crypto", "Passive Income", "The Stock Market", "Budgeting", "Side Hustles", 
    "Real Estate", "Index Funds", "Financial Freedom", "Credit Cards", 
    "High-Yield Savings", "Day Trading", "Tax Loopholes"
  ],
  All: ["Trending", "Vlogs", "Tutorials", "Documentaries"]
});

  const [titleTemplates, setTitleTemplates] = useState([
    "How I mastered {niche} in 30 days",
    "The scary truth about {niche}...",
    "Why everyone is  wrong about {niche}",
    "I tried {niche} for a week so you don't have to",
    "Is {niche} actually worth it in 2026?",
    "Everything I wish I knew about {niche} earlier",
    "Things to avoid about {niche}",
    `${Math.floor(Math.random() * 10) + 1} secrets about {niche}`
  ]);

    


  const [selectedNiche, setSelectedNiche] = useState('Tech')

  const [videos, setVideos] = useState([]);


  const generateRandomTitle = (nicheGroup) => {
    const template = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];


    const keywords = nicheKeywords[nicheGroup] || nicheKeywords.Tech;


    const keyword = keywords[Math.floor(Math.random() * keywords.length)];

    return template.replace("{niche}",keyword);
  };
  

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchThumbnails = async () => {
      const key = process.env.EXPO_PUBLIC_PIXABAY_KEY;

      const randomPage = Math.floor(Math.random() * 10) + 1;

      const url = `https://pixabay.com/api/?key=${key}&q=${selectedNiche}&image_type=photo&per_page=10&page=${randomPage}&safesearch=true`;

      try {
        const response = await fetch(url)

        const data = await response.json()
        setVideos(data.hits)
      } catch (error) {
        console.log(error)
      }
    }

    fetchThumbnails()
  }, [selectedNiche, refreshKey])
  


  const videoTypes = ['All', 'Gaming', 'Tech', 'Fitness', 'Finance']

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: 'white' }}>


      {/* Header Container */}
      <View style={{ justifyContent: 'space-between', marginTop: 40, flexDirection: "row", alignItems: "center" }}>

        {/* Left side icons */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={{ width: 30, height: 30 }} source={require("../assets/images/SoloTube Logo.png")} resizeMode="contain"/>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}> SoloTube</Text>
        </View>

        {/* Right side icons */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            <Ionicons style={{ marginRight: 20}} size={30} name="notifications-outline"></Ionicons>
          </TouchableOpacity>


          <TouchableOpacity>
            <Ionicons size={30} name="search-outline"></Ionicons>
          </TouchableOpacity>
        </View>

      </View>




      {/* Navbar Container */}

       <View style={{
        zIndex: 1,
        backgroundColor: 'white',
        height: 100,
        right: 0, 
        padding: 0,
        left: 0, 
        position: 'absolute', 
        bottom: 0, flexDirection: "row", alignItems: "center", justifyContent: 'center', gap: 30 }}>

        <TouchableOpacity style={{ borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons style={{}} size={30} name="home"></Ionicons>
          <Text style={{fontSize: 12}}>Home</Text>
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity onPress={() => router.push("/profile")} style={{ borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons size={30} name="person-outline"></Ionicons>
          <Text style={{fontSize: 12}}>You</Text>
        </TouchableOpacity>

      


        {/* Library */}
        <TouchableOpacity style={{ borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons size={30} name="folder-outline"></Ionicons>
          <Text style={{fontSize: 12}}>Library</Text>
        </TouchableOpacity>



        {/* Upload */}
        <TouchableOpacity style={{
          width: 50, 
          height: 50, 
          backgroundColor: '#E0E0E0', 
          justifyContent: 'center', 
          alignItems: 'center',
          borderRadius: 99,
          }}>
          <Ionicons style={{}} size={30} name="add"></Ionicons>
        </TouchableOpacity>

      </View>






      {/* Video categories container */}
      <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', gap:10, justifyContent: 'space-between'}}>

        {videoTypes.map((niche , index) => (
          <TouchableOpacity onPress={() => setSelectedNiche(niche)}
          key={index} style={{ 
            backgroundColor: selectedNiche === niche ? 'black' : '#E0E0E0', 
            height: 40, 
            paddingHorizontal: 15, 
            justifyContent: 'center', 
            borderRadius: 10 }}>
              <Text style={{color: selectedNiche === niche ? 'white' : 'black', fontWeight: 'bold'}}>{niche}</Text>
          </TouchableOpacity>
        ))}

      </View>



        

      



      {/* Videos container */}

      <ScrollView style={{ marginTop: 30 }}>

      {videos.map((item, index) => (
      
      <View key = {index} style={{marginBottom: 20}}>

        <TouchableOpacity style={{ gap: 10, borderRadius: 25, width: "100%", height: "200", backgroundColor: '#E0E0E0' }}>
          <Image 
          source={{ uri: item.webformatURL }} 
          style={{ width: '100%', height: 200, borderRadius: 15 }} 
          />
        </TouchableOpacity>

        {/* User & Title */}
        <View style={{flexDirection: 'row', marginTop: 10, gap: 10, alignItems: 'center'}}>     
          {/* User */}
          <TouchableOpacity style={{height: 50, width: 50, borderRadius: 99, backgroundColor: '#E0E0E0', overflow: 'hidden'}}>
            <Image 
             source={{ uri: item.webformatURL }}
             style={{ width: '100%', height: "100%", borderRadius: 15 }} 
            />
          </TouchableOpacity>


          {/* Title */}
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
            <Text style={{ fontWeight: '500', fontSize: 15, color: 'black'}}>{generateRandomTitle(selectedNiche)} </Text>
            <Text style={{ fontSize: 12, color: '#636363'}}> {item.user} • {generateRandomViews()} • {generateRandomTime()}  </Text>
          </View>
        </View>

      </View>
      ))}
      </ScrollView>
      




    </View>
  );
}
