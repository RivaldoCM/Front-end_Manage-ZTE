import { useState, useEffect, useMemo, useCallback } from 'react';
import dayjs from 'dayjs';

import { TimerContainer } from './style';

export function Timer({ dataUserInBrakTime, isBackDrop, getFinishedData }: ITimer) {
	const timeDuration = dataUserInBrakTime.duration*60; //ESSA VARIAVEL NÃO PODE MUDAR

	const [increaseTime, setIncreaseTime] = useState(0);
	const [decreasetime, setDecreaseTime] = useState(0);
	const [timeIsRunning, setTimeIsRunning] = useState(true);
	const [finalValues, setFinalValues] = useState(0);

	useEffect(() => {
		/*
			ATUALIZA E ENVIA OS DADOS PARA O COMPONENTE PAI EM TEMPO REAL.
			É FEITO ISSO PARA QUE TENHA DADOS CORRETOS E ENVIE PARA A API.
			É USADO UM STATE ESPECIFICO PARA ESSE CASO PARA NAO TERMOS PROBLEMA
			DE ATUALIZAÇÃO DE HOOKS DIFERENTES AO MESMO TEMPO COMNFLITANDO
			EM COMPONENTES DIFERENTES.
		*/
		if(getFinishedData){
			getFinishedData(finalValues);
		}
	},[increaseTime, decreasetime]);

	useEffect(() => {
		//AQUI REALIZA O CALCULO DO TEM QUE SE ESTA EM PAUSA PARA SEMPRE QUE ATUALIZAR
		//A PAGINA ESTAR DE ACORDO COM O HORARIO CORRETO.
		const nowInSeconds = dayjs().hour() * 3600 + dayjs().minute() * 60 + dayjs().second();
		const timeDifferenceInSeconds = timeDuration - (nowInSeconds - dataUserInBrakTime.startAt);

		if (timeDifferenceInSeconds > 0) {
			setDecreaseTime(timeDifferenceInSeconds);
		} else {
			setTimeIsRunning(false);
		}
	}, [dataUserInBrakTime]);

	useEffect(() => {
		/*
			AQUI TEMOS OS DOIS CONTADORES, O CRONOMETRO, E CASO O TEMPO ACABE
			COMEÇA A ADICIONAR TEMPO E ATUALIZA OS ESTADOS.
		*/
		if (timeIsRunning) {
			const intervalId = setInterval(() => {
				setDecreaseTime((prevTime: number) => {
					if (prevTime <= 0) {
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
				setIncreaseTime((prevTime: number) => {
					return prevTime + 1;
				});
			}, 1000);
			return () => clearInterval(intervalId);
		}
	}, [timeIsRunning]);

	const formatTime = useCallback((value: number) => {
		return value < 10 ? `0${value}` : value;
	}, []);

	const timerDisplay = useMemo(() => {
		const hours = Math.floor(decreasetime / 3600);
		const minutes = Math.floor((decreasetime % 3600) / 60);
		const seconds = decreasetime % 60;

		setFinalValues(decreasetime);

		return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
	}, [decreasetime]);

	const increaseTimerDisplay = useMemo(() => {
		const now = dayjs().hour() * 3600 + dayjs().minute() * 60 + dayjs().second();
		const exceeded = (now - 2) - (dataUserInBrakTime.startAt + timeDuration);
		const hours = Math.floor(exceeded / 3600);
		const minutes = Math.floor((exceeded % 3600) / 60);
		const seconds = exceeded % 60;

		setFinalValues(exceeded*-1);

		if(exceeded > 0){
			return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
		} else {
			return "00:00:00"
		}
	}, [increaseTime]);

	return (
		<TimerContainer className='flex' isBackDrop={isBackDrop}>
			<p>{timerDisplay}</p>
			{
				!timeIsRunning ?
					<p>{'-' + increaseTimerDisplay}</p>
				:
				<></>
			}
		</TimerContainer>
	);
}