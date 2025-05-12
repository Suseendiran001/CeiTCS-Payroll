
import React from 'react';

interface OnsiteMapProps {
  activeCountry: string;
  onsiteStats: {
    country: string;
    count: number;
    highlightColor: string;
  }[];
}

const OnsiteMap = ({ activeCountry, onsiteStats }: OnsiteMapProps) => {
  // This is a simplified world map component for illustration purposes
  // In a real application, you might use a proper map library like react-simple-maps
  
  return (
    <div className="h-[180px] flex items-center justify-center bg-slate-100 rounded-lg relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2560px-World_map_-_low_resolution.svg.png')] bg-no-repeat bg-center bg-contain"></div>
      
      <div className="absolute" style={{ top: '35%', left: '22%' }}>
        <div 
          className={`h-6 w-6 rounded-full flex items-center justify-center ${
            activeCountry === 'USA' || activeCountry === 'all' 
              ? 'bg-blue-500 text-white border-2 border-white shadow-lg' 
              : 'bg-blue-200 text-blue-800'
          }`}
        >
          <span className="text-xs font-bold">
            {onsiteStats.find(s => s.country === 'USA')?.count || 0}
          </span>
        </div>
        <div className="absolute text-xs font-medium mt-1 text-center w-12 -left-3">USA</div>
      </div>
      
      <div className="absolute" style={{ top: '28%', left: '45%' }}>
        <div 
          className={`h-6 w-6 rounded-full flex items-center justify-center ${
            activeCountry === 'UK' || activeCountry === 'all' 
              ? 'bg-green-500 text-white border-2 border-white shadow-lg' 
              : 'bg-green-200 text-green-800'
          }`}
        >
          <span className="text-xs font-bold">
            {onsiteStats.find(s => s.country === 'UK')?.count || 0}
          </span>
        </div>
        <div className="absolute text-xs font-medium mt-1 text-center w-12 -left-3">UK</div>
      </div>
      
      <div className="absolute" style={{ top: '30%', left: '48%' }}>
        <div 
          className={`h-6 w-6 rounded-full flex items-center justify-center ${
            activeCountry === 'Germany' || activeCountry === 'all' 
              ? 'bg-yellow-500 text-white border-2 border-white shadow-lg' 
              : 'bg-yellow-200 text-yellow-800'
          }`}
        >
          <span className="text-xs font-bold">
            {onsiteStats.find(s => s.country === 'Germany')?.count || 0}
          </span>
        </div>
        <div className="absolute text-xs font-medium mt-1 text-center w-12 -left-3">Germany</div>
      </div>
      
      <div className="absolute" style={{ top: '61%', left: '81%' }}>
        <div 
          className={`h-6 w-6 rounded-full flex items-center justify-center ${
            activeCountry === 'Australia' || activeCountry === 'all' 
              ? 'bg-purple-500 text-white border-2 border-white shadow-lg' 
              : 'bg-purple-200 text-purple-800'
          }`}
        >
          <span className="text-xs font-bold">
            {onsiteStats.find(s => s.country === 'Australia')?.count || 0}
          </span>
        </div>
        <div className="absolute text-xs font-medium mt-1 text-center w-12 -left-3">Australia</div>
      </div>
      
      <div className="absolute" style={{ top: '45%', left: '73%' }}>
        <div 
          className={`h-6 w-6 rounded-full flex items-center justify-center ${
            activeCountry === 'Singapore' || activeCountry === 'all' 
              ? 'bg-red-500 text-white border-2 border-white shadow-lg' 
              : 'bg-red-200 text-red-800'
          }`}
        >
          <span className="text-xs font-bold">
            {onsiteStats.find(s => s.country === 'Singapore')?.count || 0}
          </span>
        </div>
        <div className="absolute text-xs font-medium mt-1 text-center w-12 -left-3">Singapore</div>
      </div>
    </div>
  );
};

export default OnsiteMap;
