// ProgressCircle.js
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCircle = ({ percent }) => {
    return (
        <div className='w-full h-full'>
            <CircularProgressbar 
                value={percent}
                strokeWidth={18}
                styles={buildStyles({
                    pathColor: 'rgb(61,167,80)', // Màu của phần đã hoàn thành
                    trailColor: '#e0e0e0', // Màu của phần còn lại
                    strokeLinecap: 'round', // Đường viền tròn, không bị cắt
                })}
            />
        </div>
    );
};

export default ProgressCircle;
