import React from "react";
import LazyLoader from '~/components/LazyLoader';


interface MiniDashboardProps {
}

const MiniDashboard:React.FC<MiniDashboardProps> = function MiniDashboard(props) {
  return (<LazyLoader path={'components/MiniDashboard/Dashboard'}  />);
}

export default MiniDashboard;