import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Chart from 'chart.js/auto';
import "./Home.css"
import { SiFastify } from 'react-icons/si';
import { CgArrowAlignH } from 'react-icons/cg';
import { FaCarBurst } from 'react-icons/fa6';
import { AiFillAlert } from 'react-icons/ai';
import { FaAngellist } from 'react-icons/fa';
import { GiTrafficLightsGreen } from 'react-icons/gi';
import { CgTimelapse } from 'react-icons/cg';
import { FaRegThumbsUp } from 'react-icons/fa';
import { BsSpeedometer2 } from 'react-icons/bs';
import { FaAccessibleIcon } from 'react-icons/fa';
import { BsFuelPump } from 'react-icons/bs';
import { GiSubmarineMissile } from 'react-icons/gi';
import { FaBabyCarriage } from 'react-icons/fa';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const trafficData = {
  beforeSystem: {
    averageWaitTime: [8.5,<CgTimelapse/>],
    congestionLevel: [85,<FaBabyCarriage/>],
    fuelWasted: [2.3,<BsFuelPump/>],
    emissionsKg: [156,<GiSubmarineMissile/>],
    accidents: [12,<FaAccessibleIcon/>],
    throughput: [450,<BsSpeedometer2/>]
  },
  afterSystem: {
    averageWaitTime: 3.2,
    congestionLevel: 25,
    fuelWasted: 0.8,
    emissionsKg: 52,
    accidents: 3,
    throughput: 720
  },
  realTimeMetrics: [
    { time: "09:00", flow: 320, congestion: 45 },
    { time: "09:15", flow: 380, congestion: 35 },
    { time: "09:30", flow: 420, congestion: 28 },
    { time: "09:45", flow: 450, congestion: 22 },
    { time: "10:00", flow: 380, congestion: 30 }
  ],
  trafficLights: [
    {id: "TL001", location: "Main St & 1st Ave", status: "green", timeRemaining: 45, predictedNext: "yellow"},
    {id: "TL002", location: "Broadway & 2nd St", status: "red", timeRemaining: 15, predictedNext: "green"},
    {id: "TL003", location: "Park Ave & 3rd St", status: "yellow", timeRemaining: 3, predictedNext: "red"}
  ]
};

const getRandomAlert = () => {
  const alertTypes = ['info', 'warning', 'success'];
  const alertMessages = [
    'Emergency vehicle priority activated',
    'Traffic optimization complete',
    'Congestion pricing adjusted',
    'New traffic pattern detected',
    'System performance optimal'
  ];
  return {
    type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
    message: alertMessages[Math.floor(Math.random() * alertMessages.length)],
    time: 'Just now'
  };
};

const TrafficSimulation = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, type: 'car', position: 10, road: 'horizontal', direction: 1, speed: 0.2 },
    { id: 2, type: 'car', position: 50, road: 'horizontal', direction: 1, speed: 0.3 },
    { id: 3, type: 'car', position: 20, road: 'vertical', direction: 1, speed: 0.25 },
    { id: 4, type: 'emergency', position: 70, road: 'vertical', direction: 1, speed: 0.4 }
  ]);
  const [lights, setLights] = useState([
    { id: 1, status: 'green', timer: 30, x: 25, y: 25 },
    { id: 2, status: 'red', timer: 15, x: 75, y: 25 },
    { id: 3, status: 'red', timer: 20, x: 25, y: 75 },
    { id: 4, status: 'green', timer: 30, x: 75, y: 75 }
  ]);

  useEffect(() => {
    const vehicleInterval = setInterval(() => {
      setVehicles(prevVehicles =>
        prevVehicles.map(v => {
          let newPosition = v.position + v.direction * v.speed;
          if (newPosition > 100) newPosition = 0;
          if (newPosition < 0) newPosition = 100;
          return { ...v, position: newPosition };
        })
      );
    }, 16);

    const lightInterval = setInterval(() => {
      setLights(prevLights =>
        prevLights.map(l => {
          const newTimer = l.timer - 1;
          if (newTimer <= 0) {
            let newStatus;
            if (l.status === 'green') newStatus = 'yellow';
            else if (l.status === 'yellow') newStatus = 'red';
            else newStatus = 'green';
            
            const newTime = newStatus === 'green' ? 30 : newStatus === 'yellow' ? 3 : 20;
            return { ...l, status: newStatus, timer: newTime };
          }
          return { ...l, timer: newTimer };
        })
      );
    }, 1000);

    return () => {
      clearInterval(vehicleInterval);
      clearInterval(lightInterval);
    };
  }, []);

  return (
    <div className="relative h-full w-full bg-gray-200 rounded-lg overflow-hidden border border-gray-400">
      {/* Roads */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full h-8 bg-gray-500">
        <div className="absolute inset-y-0 left-0 w-full h-1 bg-white/50 animate-[roadLines_2s_linear_infinite]" style={{ top: 'calc(50% - 2px)' }}></div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-gray-500">
        <div className="absolute inset-x-0 top-0 h-full w-1 bg-white/50 animate-[roadLines_2s_linear_infinite]" style={{ left: 'calc(50% - 2px)' }}></div>
      </div>
      
      {/* Buildings */}
      <div className="absolute inset-0 z-0 flex justify-between px-16 py-12">
        <div className="w-12 h-full bg-gray-400"></div>
        <div className="w-16 h-full bg-gray-600"></div>
        <div className="w-10 h-full bg-gray-400"></div>
        <div className="w-14 h-full bg-gray-500"></div>
      </div>

      {/* Vehicles */}
      {vehicles.map(v => (
        <div 
          key={v.id} 
          className={`absolute w-8 h-4 rounded-sm transition-all duration-100 ease-linear ${v.type === 'car' ? 'bg-gray-800' : 'bg-red-500 animate-pulse'}`}
          style={{ 
            [v.road === 'horizontal' ? 'left' : 'top']: `${v.position}%`,
            [v.road === 'horizontal' ? 'top' : 'left']: v.road === 'horizontal' ? 'calc(50% - 10px)' : 'calc(50% - 10px)',
            transform: `translateX(-50%) translateY(-50%) rotate(${v.direction === 1 ? '0deg' : '180deg'})`
          }}
        ></div>
      ))}

      {/* Traffic Lights */}
      {lights.map(l => (
        <div 
          key={l.id} 
          className="absolute flex flex-col items-center p-1 bg-gray-800 rounded-md shadow-lg"
          style={{ 
            left: `${l.x}%`, 
            top: `${l.y}%`, 
            transform: 'translateX(-50%) translateY(-50%)'
          }}
        >
          <div className="flex flex-col space-y-1">
            <div className={`w-3 h-3 rounded-full ${l.status === 'red' ? 'bg-red-500 shadow-red' : 'bg-gray-700'}`}></div>
            <div className={`w-3 h-3 rounded-full ${l.status === 'yellow' ? 'bg-yellow-500 shadow-yellow' : 'bg-gray-700'}`}></div>
            <div className={`w-3 h-3 rounded-full ${l.status === 'green' ? 'bg-green-500 shadow-green' : 'bg-gray-700'}`}></div>
          </div>
          <span className="mt-1 text-xs text-white">{l.timer}s</span>
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const [FiveSecWait,setFiveSecWait] = useState(false);
   const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [navActive, setNavActive] = useState('home');
  const [progress, setProgress] = useState({ travel: 0, congestion: 0, emissions: 0 });
  const [metrics, setMetrics] = useState({ flow: 720, congestion: 25, waitTime: 3.2, tax: 37.5 });
  const [trafficLights, setTrafficLights] = useState(trafficData.trafficLights);
  const [alerts, setAlerts] = useState([]);
  const [chartData, setChartData] = useState({
    labels: trafficData.realTimeMetrics.map(item => item.time),
    datasets: [{
      label: 'Traffic Flow',
      data: trafficData.realTimeMetrics.map(item => item.flow),
      borderColor: '#4a4a4a',
      backgroundColor: 'rgba(100, 100, 100, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#4a4a4a',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 6
    }, {
      label: 'Congestion Level',
      data: trafficData.realTimeMetrics.map(item => item.congestion),
      borderColor: '#4a4a4a',
      backgroundColor: 'rgba(100, 100, 100, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#4a4a4a',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 6
    }]
  });

  const chartRef = useRef(null);
  const particlesRef = useRef(null);
  const comparisonThumbRef = useRef(null);
  const comparisonVisualRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setNavActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0% -50% 0%' }
    );

    sectionsRef.current.forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach(section => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      const progressTimer = setTimeout(() => {
        setProgress({ travel: 62, congestion: 40, emissions: 66 });
      }, 500);
      return () => clearTimeout(progressTimer);
    }
  }, [loading]);

  useEffect(() => {
    let metricInterval;
    if (!loading) {
      metricInterval = setInterval(() => {
        setMetrics(prev => ({
          flow: Math.floor(Math.max(600, Math.min(800, prev.flow + (Math.random() - 0.5) * 20))),
          congestion: Math.floor(Math.max(15, Math.min(45, prev.congestion + (Math.random() - 0.5) * 10))),
          waitTime: (Math.max(2.5, Math.min(4, prev.waitTime + (Math.random() - 0.5) * 0.5))).toFixed(1),
          tax: prev.tax
        }));
      }, 3000);
    }

    let currentChart;
    if (chartRef.current) {
      currentChart = new Chart(chartRef.current, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: { color: '#333' }
            }
          },
          scales: {
            x: { grid: { color: 'rgba(0,0,0,0.1)' }, ticks: { color: '#555' } },
            y: { grid: { color: 'rgba(0,0,0,0.1)' }, ticks: { color: '#555' } }
          },
          animation: { duration: 2000, easing: 'easeInOutCubic' }
        }
      });

      const chartInterval = setInterval(() => {
        const lastTime = chartData.labels[chartData.labels.length - 1];
        const [hours, minutes] = lastTime.split(':').map(Number);
        const nextMinutes = minutes + 15;
        const nextHours = nextMinutes >= 60 ? hours + 1 : hours;
        const newTime = `${String(nextHours % 24).padStart(2, '0')}:${String(nextMinutes % 60).padStart(2, '0')}`;
        
        setChartData(prev => {
          const newLabels = [...prev.labels, newTime];
          const newFlows = [...prev.datasets[0].data, Math.floor(320 + Math.random() * 200)];
          const newCongestions = [...prev.datasets[1].data, Math.floor(Math.max(15, 45 - Math.random() * 30))];

          if (newLabels.length > 8) {
            newLabels.shift();
            newFlows.shift();
            newCongestions.shift();
          }

          return {
            labels: newLabels,
            datasets: [{ ...prev.datasets[0], data: newFlows }, { ...prev.datasets[1], data: newCongestions }]
          };
        });
      }, 5000);

      return () => {
        currentChart.destroy();
        clearInterval(chartInterval);
      };
    }

    return () => {
      clearInterval(metricInterval);
      if (currentChart) {
        currentChart.destroy();
      }
    };
  }, [loading, chartData]);

  useEffect(() => {
    const lightIntervals = trafficLights.map((light, index) => {
      let state = light.status;
      return setInterval(() => {
        setTrafficLights(prevLights =>
          prevLights.map(l => {
            if (l.id === light.id) {
              const newTime = l.timeRemaining > 1 ? l.timeRemaining - 1 : (l.predictedNext === 'green' ? 45 : l.predictedNext === 'yellow' ? 3 : 15);
              const newStatus = newTime === 1 ? l.predictedNext : l.status;
              const newPredictedNext = newStatus === 'green' ? 'yellow' : newStatus === 'yellow' ? 'red' : 'green';
              return { ...l, status: newStatus, timeRemaining: newTime, predictedNext: newPredictedNext };
            }
            return l;
          })
        );
      }, 1000);
    });
    return () => lightIntervals.forEach(clearInterval);
  }, [trafficLights]);

  useEffect(() => {
    const alertTimer = setInterval(() => {
      setAlerts(prevAlerts => {
        const newAlerts = [getRandomAlert(), ...prevAlerts];
        if (newAlerts.length > 5) {
          newAlerts.pop();
        }
        return newAlerts;
      });
    }, 15000);
    return () => clearInterval(alertTimer);
  }, []);

  useEffect(() => {
    const slider = comparisonThumbRef.current;
    const visual = comparisonVisualRef.current;
    if (!slider || !visual) return;
    
    let isDragging = false;
    
    const updateComparison = (percentage) => {
      if (visual) {
        visual.querySelector('.before-scenario').style.transform = `translateX(${percentage - 100}%)`;
        visual.querySelector('.after-scenario').style.transform = `translateX(${percentage}%)`;
      }
      if (slider) {
        slider.style.left = `${percentage}%`;
      }
    };

   
    


    const startDrag = (e) => {
      isDragging = true;
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', endDrag);
      document.addEventListener('touchmove', onDrag);
      document.addEventListener('touchend', endDrag);
    };

    const onDrag = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const rect = visual.getBoundingClientRect();
      const currentX = e.clientX || e.touches[0].clientX;
      const percentage = Math.max(0, Math.min(100, ((currentX - rect.left) / rect.width) * 100));
      updateComparison(percentage);
    };

    const endDrag = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('touchend', endDrag);
    };

    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('touchstart', startDrag);

    updateComparison(50);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const navHeight = 80;
      window.scrollTo({
        top: section.offsetTop - navHeight,
        behavior: 'smooth'
      });
    }
  };

  const clearAlerts = () => setAlerts([]);

  const toggleHeatmapCell = (e) => {
    const cell = e.target;
    if (cell.classList.contains('bg-green-500/40')) {
      cell.className = 'bg-yellow-500/60 w-full h-full cursor-pointer transition-all duration-300 hover:scale-110';
    } else if (cell.classList.contains('bg-yellow-500/60')) {
      cell.className = 'bg-red-500/80 w-full h-full cursor-pointer transition-all duration-300 hover:scale-110';
    } else {
      cell.className = 'bg-green-500/40 w-full h-full cursor-pointer transition-all duration-300 hover:scale-110';
    }
  };

  const NavLink = ({ href, text }) => (
    <a href={href} onClick={(e) => { e.preventDefault(); scrollToSection(href.substring(1)); }}
      className={`relative px-4 py-3 text-gray-400 transition-all duration-300 rounded-3xl overflow-hidden cursor-pointer
        ${navActive === href.substring(1) ? 'bg-white text-gray-900 border-2 shadow-lg shadow-black' : 'hover:bg-gray-100 hover:text-gray-900'}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-gray-200 to-transparent transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></span>
    </a>
  );

  return (
    <>
      <style>{`
        body {
        
          background-color: white;
          color: #333;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes glitch1 { 0%, 90%, 100% { transform: translate(0); opacity: 0; } 95% { transform: translate(-2px, 2px); opacity: 0.7; } }
        @keyframes glitch2 { 0%, 90%, 100% { transform: translate(0); opacity: 0; } 95% { transform: translate(2px, -2px); opacity: 0.7; } }
        @keyframes lightCycle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        .glitch-effect::before, .glitch-effect::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; }
        .glitch-effect::before { color: #f96161; animation: glitch1 2s infinite; }
        .glitch-effect::after { color: #43b8cc; animation: glitch2 2s infinite; }
        .loader-light-red.active { animation: lightCycle 1.5s infinite; }
        .loader-light-yellow.active { animation: lightCycle 1.5s infinite; }
        .loader-light-green.active { animation: lightCycle 1.5s infinite; }
        .slide-in-up { animation: slideInUp 1s ease-out forwards; }
        .slide-in-right { animation: slideInRight 1s ease-out forwards; }
        .progress-fill { transition: width 2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .traffic-light-3d .light.active {
          opacity: 1;
          transform: scale(1.1);
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.3),
            0 0 20px currentColor,
            0 0 40px currentColor;
        }
        .smart-light .light.active {
          opacity: 1;
          box-shadow: 0 0 15px currentColor;
          transform: scale(1.2);
        }
        .road-segment::after {
          content: '';
          position: absolute;
          background: repeating-linear-gradient(
            90deg,
            #333 0px,
            #333 10px,
            transparent 10px,
            transparent 20px
          );
          height: 2px;
          width: 100%;
          top: 50%;
          transform: translateY(-50%);
          animation: roadLines 2s linear infinite;
        }
        .road-segment.vertical::after {
          background: repeating-linear-gradient(
            0deg,
            #333 0px,
            #333 10px,
            transparent 10px,
            transparent 20px
          );
          width: 2px;
          height: 100%;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
        }
        @keyframes roadLines {
          0% { transform: translateY(-50%) translateX(0); }
          100% { transform: translateY(-50%) translateX(20px); }
        }
        @keyframes trafficLightGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(0,0,0,0.3); }
          50% { box-shadow: 0 0 20px rgba(0,0,0,0.6); }
        }
        @keyframes vehicleMove {
          0%, 100% { transform: translateX(0) scale(1); }
          50% { transform: translateX(200px) scale(1.1); }
        }
        @keyframes emergencyMove {
          0%, 100% { 
            transform: translateX(0) scale(1); 
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 10px #f96161;
          }
          50% { 
            transform: translateX(150px) scale(1.2); 
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px #f96161;
          }
        }
        @keyframes aiSignal {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 5px rgba(0,0,0,0.4);
          }
          50% { 
            transform: scale(1.3);
            box-shadow: 0 0 20px rgba(0,0,0,0.8);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        @keyframes flow {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
      `}</style>

      {/* Loading Animation */}
      {loading && (
        <div className="fixed inset-0 z-[10000] bg-white text-gray-800 flex items-center justify-center transition-opacity duration-800">
          <div className="flex flex-col items-center space-y-8">
            <div className="flex flex-col space-y-3 p-5 bg-gray-200 rounded-xl shadow-lg animate-pulse">
              <div className="h-6 w-6 rounded-full bg-red-500/30 loader-light-red"></div>
              <div className="h-6 w-6 rounded-full bg-yellow-500/30 loader-light-yellow"></div>
              <div className="h-6 w-6 rounded-full bg-green-500/30 loader-light-green"></div>
            </div>
            <div className="text-xl font-bold tracking-wider text-gray-800">Loading...</div>
          </div>
        </div>
      )}

      {/* Parallax Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 transform" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
          <div className="absolute w-16 h-16 rounded-full bg-gray-200 top-1/4 left-1/4 animate-pulse"></div>
          <div className="absolute w-12 h-12 rounded-full bg-gray-300 top-1/2 right-1/4 animate-pulse"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`montserrat-font fixed top-0 left-0 right-0 z-50 transition-all duration-400 backdrop-blur-xl ${scrollY > 50 ? 'w-full pl-16 pr-32 rounded-3xl bg-white/80 shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-center gap-20 items-center">
          <div className="flex items-center space-x-3">
            <div className="text-3xl text-gray-800">🚦</div>
            <span className="text-xl font-bold text-gray-800">Traffic-Slashers</span>
          </div>
          <div className="flex space-x-6">
            <NavLink href="#home" text="Home" />
            <NavLink href="#dashboard" text="Dashboard" />
            <NavLink href="#comparison" text="Comparison" />
            <NavLink href="#features" text="Features" />
               <a href="/main" className='bg-yellow-400 relative px-4 py-3 text-black border-2 border-black  shadow-lg shadow-black transition-all duration-300 rounded-3xl overflow-hidden cursor-pointer'> Get started </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={el => sectionsRef.current[0] = el} className="inter-font min-h-screen flex items-center bg-white text-gray-800 relative overflow-hidden">
        <div className="container mx-auto px-4 py-24 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="slide-in-up">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
              <span className={`px-10 py-5   block text-gray-800 transition-all bg-yellow-400`}>Intelligent Traffic</span>
              <span className="block text-gray-600">Decongestion System</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Revolutionizing urban mobility with AI-powered traffic optimization, real-time predictions, and smart congestion pricing that adapts to city dynamics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-100 p-5 rounded-xl border border-gray-200 transition-all duration-300 hover:scale-105">
                <div className="text-2xl mb-2"><SiFastify/></div>
                <span className="block text-4xl font-bold text-gray-800">{progress.travel}%</span>
                <span className="block text-sm text-gray-500">Faster Travel</span>
                <div className="h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-gray-500" style={{ width: `${progress.travel}%` }}></div>
                </div>
              </div>
              <div className="bg-gray-100 p-5 rounded-xl border border-gray-200 transition-all duration-300 hover:scale-105">
                <div className="text-2xl mb-2"><FaCarBurst/></div>
                <span className="block text-4xl font-bold text-gray-800">{progress.congestion}%</span>
                <span className="block text-sm text-gray-500">Less Congestion</span>
                <div className="h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-gray-500" style={{ width: `${progress.congestion}%` }}></div>
                </div>
              </div>
              <div className="bg-gray-100 p-5 rounded-xl border border-gray-200 transition-all duration-300 hover:scale-105">
                <div className="text-2xl mb-2"><GiTrafficLightsGreen/></div>
                <span className="block text-4xl font-bold text-gray-800">{progress.emissions}%</span>
                <span className="block text-sm text-gray-500">Less Emissions</span>
                <div className="h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-gray-500" style={{ width: `${progress.emissions}%` }}></div>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => scrollToSection('dashboard')} className="px-6 py-3 bg-gray-800 text-white rounded-full font-semibold transition-all duration-300 hover:bg-gray-700 hover:shadow-xl hover:scale-105">
                View Dashboard
              </button>
              <button onClick={() => scrollToSection('comparison')} className="px-6 py-3 bg-transparent border border-gray-400 text-gray-600 rounded-full font-semibold transition-all duration-300 hover:bg-gray-100 hover:scale-105">
                See Results
              </button>
            </div>
          </div>
          <div className="hidden lg:block slide-in-right">
            <div className="p-8 rounded-xl backdrop-blur-sm bg-gray-100/50 shadow-lg border border-gray-200">
              <div className="relative h-64 w-full">
                <TrafficSimulation />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" ref={el => sectionsRef.current[1] = el} className="inter-font py-24 bg-gray-100 text-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold glitch-effect" data-text="Real-Time Traffic Analytics">Real-Time Traffic Analytics</h2>
            <p className="mt-4 text-gray-600">Monitor and optimize traffic flow with AI-powered insights and predictive algorithms</p>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800 shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Live Traffic Metrics</h3>
                <span className="text-green-500 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>LIVE</span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{metrics.flow}</div>
                  <div className="text-sm text-gray-500">Vehicles/Hour</div>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{metrics.congestion}%</div>
                  <div className="text-sm text-gray-500">Congestion</div>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{metrics.waitTime}</div>
                  <div className="text-sm text-gray-500">Min Wait Time</div>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">${metrics.tax}</div>
                  <div className="text-sm text-gray-500">Peak Zone Tax</div>
                </div>
              </div>
            </div>

            <div className="border-gray-800 shadow-2xl col-span-1 md:col-span-2 lg:col-span-1 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-xl font-semibold mb-4">Traffic Flow Predictions</h3>
              <div className="h-64">
                <canvas ref={chartRef}></canvas>
              </div>
            </div>

            <div className="border-gray-800 shadow-2xl bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Smart Traffic Control</h3>
                <span className="px-3 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">AI Mode</span>
              </div>
              <div className="space-y-4">
                {trafficLights.map(light => (
                  <div key={light.id} className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg">
                    <div className="flex flex-col space-y-1">
                      <div className={`h-3 w-3 rounded-full ${light.status === 'red' ? 'bg-red-500' : 'bg-red-500/20'}`}></div>
                      <div className={`h-3 w-3 rounded-full ${light.status === 'yellow' ? 'bg-yellow-500' : 'bg-yellow-500/20'}`}></div>
                      <div className={`h-3 w-3 rounded-full ${light.status === 'green' ? 'bg-green-500' : 'bg-green-500/20'}`}></div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{light.location}</div>
                      <div className={`text-sm ${light.status === 'red' ? 'text-red-400' : light.status === 'yellow' ? 'text-yellow-400' : 'text-green-400'}`}>{light.status.charAt(0).toUpperCase() + light.status.slice(1)} - {light.timeRemaining}s</div>
                    </div>
                    <div className="text-xs text-gray-400">Next: {light.predictedNext.charAt(0).toUpperCase() + light.predictedNext.slice(1)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-gray-800 shadow-2xl bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-xl font-semibold mb-4">Live System Alerts</h3>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className={`flex space-x-3 p-3 rounded-lg border-l-4 ${alert.type === 'info' ? 'bg-blue-500/10 border-blue-500' : alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500' : 'bg-green-500/10 border-green-500'}`}>
                    <div className="text-lg mt-2">
                      {alert.type === 'info' ? <FaAngellist/> : alert.type === 'warning' ? <AiFillAlert/> : <FaRegThumbsUp/>}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{alert.message}</div>
                      <div className="text-xs text-gray-500">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={clearAlerts} className="mt-4 w-full px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Clear All
              </button>
            </div>

            <div className="border-gray-800 shadow-2xl bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-xl font-semibold mb-4">Traffic Density Heatmap</h3>
              <div className="relative h-48 w-full">
                <div className="grid grid-cols-4 grid-rows-3 h-full w-full gap-1 p-1 bg-gray-200 rounded-lg">
                  <div className="bg-green-500/40 w-full h-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={toggleHeatmapCell}></div>
                  <div className="bg-yellow-500/60 w-full h-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={toggleHeatmapCell}></div>
                  <div className="bg-red-500/80 w-full h-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={toggleHeatmapCell}></div>
                  <div className="bg-green-500/40 w-full h-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={toggleHeatmapCell}></div>
                  <div className="bg-yellow-500/60 w-full h-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={toggleHeatmapCell}></div>
                  <div className="bg-red-500/80 w-full h-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={toggleHeatmapCell}></div>
                  <div className="bg-red-500/80 w-full h-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={toggleHeatmapCell}></div>
                  <div className="bg-yellow-500/60 w-full h-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={toggleHeatmapCell}></div>
                  <div className="bg-green-500/40 w-full h-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={toggleHeatmapCell}></div>
                  <div className="bg-yellow-500/60 w-full h-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={toggleHeatmapCell}></div>
                  <div className="bg-green-500/40 w-full h-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={toggleHeatmapCell}></div>
                  <div className="bg-green-500/40 w-full h-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={toggleHeatmapCell}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" ref={el => sectionsRef.current[2] = el} className="py-24 bg-white text-gray-800">
        <div className="inter-font container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold">Transformation Impact Analysis</h2>
            <p className="mt-4 text-gray-600">Witness the dramatic improvements in traffic efficiency and urban mobility</p>
          </div>

          <div className='flex justify-center '>
          <video className='w-[720px] my-2 mb-5  border-2 border-black shadow-2xl rounded-md' autoPlay loop muted>
            <source src='v-2.mp4'/>
          </video>
</div>
       

          <div className="inter-font grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(trafficData.beforeSystem).map(key => (
              <div key={key} className="bg-white h-56 p-6 rounded-xl  shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <div className="text-center">
                   <div className="font-bold text-2xl">{trafficData.beforeSystem[key][1]}</div>

                  <h3 className="text-lg relative top-7 font-semibold mb-4 text-gray-800">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
                  <div className="relative top-8 flex items-center justify-center space-x-4">

                    <div className="text-red-500 font-bold text-2xl">{trafficData.beforeSystem[key][0]}</div>
                    <span className="text-gray-400">→</span>
                    <div className="text-green-500 font-bold text-2xl">{trafficData.afterSystem[key]}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={el => sectionsRef.current[3] = el} className="py-24 bg-gray-100 text-gray-800">
        <div className="inter-font container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Advanced AI Features</h2>
            <p className="mt-4 text-gray-600">Cutting-edge technology powering the future of intelligent traffic management</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative h-96 [perspective:1000px]">
              <div className="absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-xl flex flex-col items-center justify-center text-center [backface-visibility:hidden]">
                  <div className="text-4xl mb-4">🧠</div>
                  <h3 className="text-xl font-semibold mb-2">Real-time Prediction</h3>
                  <p className="text-sm text-gray-500">AI algorithms analyze traffic patterns to predict optimal signal timing</p>
                </div>
                <div className="absolute inset-0 bg-gray-100 p-6 rounded-xl border border-gray-200 shadow-xl flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">How it works:</h4>
                  <ul className="text-sm text-gray-500 list-none text-left space-y-2">
                    <li>✓ Machine learning models</li>
                    <li>✓ Real-time sensor processing</li>
                    <li>✓ Predictive flow optimization</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="group relative h-96 [perspective:1000px]">
              <div className="absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-xl flex flex-col items-center justify-center text-center [backface-visibility:hidden]">
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="text-xl font-semibold mb-2">Dynamic Pricing</h3>
                  <p className="text-sm text-gray-500">Congestion-based tax system that adapts to real-time traffic density</p>
                </div>
                <div className="absolute inset-0 bg-gray-100 p-6 rounded-xl border border-gray-200 shadow-xl flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Benefits:</h4>
                  <ul className="text-sm text-gray-500 list-none text-left space-y-2">
                    <li>✓ Reduces peak congestion</li>
                    <li>✓ Generates revenue</li>
                    <li>✓ Encourages alternatives</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="group relative h-96 [perspective:1000px]">
              <div className="absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-xl flex flex-col items-center justify-center text-center [backface-visibility:hidden]">
                  <div className="text-4xl mb-4">🗺️</div>
                  <h3 className="text-xl font-semibold mb-2">Smart Routing</h3>
                  <p className="text-sm text-gray-500">Intelligent route suggestions based on current traffic conditions</p>
                </div>
                <div className="absolute inset-0 bg-gray-100 p-6 rounded-xl border border-gray-200 shadow-xl flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Capabilities:</h4>
                  <ul className="text-sm text-gray-500 list-none text-left space-y-2">
                    <li>✓ Real-time optimization</li>
                    <li>✓ Multi-modal integration</li>
                    <li>✓ Emergency priority</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="group relative h-96 [perspective:1000px]">
              <div className="absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-xl flex flex-col items-center justify-center text-center [backface-visibility:hidden]">
                  <div className="text-4xl mb-4">🌿</div>
                  <h3 className="text-xl font-semibold mb-2">Environmental Impact</h3>
                  <p className="text-sm text-gray-500">Reduced emissions through optimized flow and fewer idle vehicles</p>
                </div>
                <div className="absolute inset-0 bg-gray-100 p-6 rounded-xl border border-gray-200 shadow-xl flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Benefits:</h4>
                  <ul className="text-sm text-gray-500 list-none text-left space-y-2">
                    <li>✓ Lower carbon emissions</li>
                    <li>✓ Optimized fuel consumption</li>
                    <li>✓ Improved air quality</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="inter-font bg-gray-800 text-gray-400 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-3xl">🚦</div>
              <span className="text-xl text-white">Traffic-Slashers</span>
            </div>
            <p className="text-sm mb-4">Revolutionizing urban mobility with intelligent traffic management solutions powered by cutting-edge AI technology.</p>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-white transition-colors">🐦</a>
              <a href="#" className="hover:text-white transition-colors">📘</a>
              <a href="#" className="hover:text-white transition-colors">💼</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#dashboard" className="hover:text-white transition-colors">Real-time Analytics</a></li>
              <li><a href="#comparison" className="hover:text-white transition-colors">Performance Metrics</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">AI Predictions</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Dynamic Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">System Status</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>All Systems Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">⚡</span>
                <span>Real-time Processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">🧠</span>
                <span>AI Models Active</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-xs mt-8">
          <p>&copy; 2025 Traffic-Slashers. All rights reserved. | Powered by Advanced AI Technology</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
