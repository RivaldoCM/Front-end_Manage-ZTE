import { useState, useEffect, useMemo, useCallback } from 'react';
import dayjs from 'dayjs';
import { TimerContainer } from './style';

export function Timer({ initialTime }: any) {
	const [time, setTime] = useState(20*60);
	const [timeIsRunning, setTimeIsRunning] = useState(true);

	useEffect(() => {
		const nowInSeconds = dayjs().hour() * 3600 + dayjs().minute() * 60 + dayjs().second();
		const initialTimeInSeconds = convertToSeconds(initialTime);
		const timeDifferenceInSeconds = time - (nowInSeconds - initialTimeInSeconds);

		if (timeDifferenceInSeconds > 0) {
			setTime(timeDifferenceInSeconds);
		} else {
			setTimeIsRunning(false);
		}
	}, [initialTime]);

	const formatTime = useCallback((value: any) => {
		return value < 10 ? `0${value}` : value;
	}, []);

	const timerDisplay = useMemo(() => {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const seconds = time % 60;
		return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
	}, [time, formatTime]);

	useEffect(() => {
		if (timeIsRunning) {
			const intervalId = setInterval(() => {
				setTime((prevTime: any) => {
				if (prevTime <= 0) {
					clearInterval(intervalId);
					setTimeIsRunning(false);
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);

		return () => clearInterval(intervalId);
		}
	}, [timeIsRunning]);

	return (
		<TimerContainer className='flex'>
			<p>{timerDisplay}</p>
		</TimerContainer>
	);
}

function convertToSeconds({ hours, minutes, seconds }) {
  return hours * 3600 + minutes * 60 + seconds;
}
