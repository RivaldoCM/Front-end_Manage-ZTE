import { useState, useEffect, useMemo, useCallback } from 'react';
import dayjs from 'dayjs';
import { TimerContainer } from './style';
import { useAuth } from '../../hooks/useAuth';

export function Timer({ initialTime, isBackDrop }: any) {
	const startTime = initialTime.duration*60; //ESSA VARIAVEL NÃO PODE MUDAR

	const { user } = useAuth();

	const [increaseTime, setIncreaseTime] = useState(0);
	const [decreasetime, setDecreaseTime] = useState(0);
	const [timeIsRunning, setTimeIsRunning] = useState(true);

	useEffect(() => {
		const nowInSeconds = dayjs().hour() * 3600 + dayjs().minute() * 60 + dayjs().second();
		const timeDifferenceInSeconds = startTime - (nowInSeconds - initialTime.timeInSeconds);
		if (timeDifferenceInSeconds > 0) {
			setDecreaseTime(timeDifferenceInSeconds);
		} else {
			setTimeIsRunning(false);
		}
	}, [initialTime]);

	const formatTime = useCallback((value: any) => {
		return value < 10 ? `0${value}` : value;
	}, []);

	const timerDisplay = useMemo(() => {
		const hours = Math.floor(decreasetime / 3600);
		const minutes = Math.floor((decreasetime % 3600) / 60);
		const seconds = decreasetime % 60;

		return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
	}, [decreasetime]);

	const increaseTimerDisplay = useMemo(() => {
		const now = dayjs().hour() * 3600 + dayjs().minute() * 60 + dayjs().second();
		let exceeded = 0;
		const endAt = localStorage.getItem('EndAt');
		
		if(endAt){
			exceeded = now - parseInt(endAt);
		}

		const hours = Math.floor(exceeded / 3600);
		const minutes = Math.floor((exceeded % 3600) / 60);
		const seconds = exceeded % 60;

		return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
	}, [increaseTime]);

	useEffect(() => {
		if (timeIsRunning) {
			const intervalId = setInterval(() => {
				const endAt = dayjs().hour() * 3600 + dayjs().minute() * 60 + dayjs().second();
				setDecreaseTime((prevTime: any) => {
					if (prevTime <= 0) {
						localStorage.setItem('EndAt', endAt.toString());
						clearInterval(intervalId);
						setTimeIsRunning(false);
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);
			return () => clearInterval(intervalId);
		} else {
			const intervalId = setInterval(() => {
				setIncreaseTime((prevTime: any) => {
					return prevTime + 1;
				});
			}, 1000);
			return () => clearInterval(intervalId);
		}
	}, [timeIsRunning]);

	return (
		<TimerContainer className='flex' isBackDrop={isBackDrop}>
			<p>{timerDisplay}</p>
			{
				!timeIsRunning && isBackDrop ?
					<p>{'-' + increaseTimerDisplay}</p>
				:
				<></>
			}
		</TimerContainer>
	);
}