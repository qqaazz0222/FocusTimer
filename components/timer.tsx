import React, { useState, useEffect } from "react";
import useCountDown from "react-countdown-hook";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Pause, Play, Square } from "lucide-react";

interface TimerState {
    [key: string]: number;
}
interface TimerProps {
    state: TimerState;
    setState: any;
}

const Timer = ({ state, setState }: TimerProps) => {
    const initialTime =
        (state.hour * 3600 + state.minute * 60 + state.second) * 1000;
    const [isStart, setIsStart] = useState("stop");
    const [timeLeft, { start, pause, resume, reset }] = useCountDown(
        initialTime,
        1000
    );
    const addTime = (s: number) => {
        let currentTime = initialTime;
        currentTime += s * 1000;
        setState({
            hour: Math.floor(currentTime / 1000 / 3600),
            minute: Math.floor((currentTime / 1000 / 60) % 60),
            second: (currentTime / 1000) % 60,
        });
    };
    useEffect(() => {
        if (timeLeft === 0) {
            setIsStart("stop");
        }
    }, [timeLeft]);
    return (
        <div id="timer" className="flex flex-col gap-2">
            <div id="display" className="flex flex-row gap-2 items-center">
                <Input
                    id="pixel"
                    className="text-center text-6xl h-fit"
                    type="text"
                    value={
                        isStart === "stop"
                            ? state.hour.toString().padStart(2, "0")
                            : Math.floor(timeLeft / 1000 / 3600)
                                  .toString()
                                  .padStart(2, "0")
                    }
                    onChange={(e) => {
                        setIsStart("stop");
                        setState({ ...state, hour: parseInt(e.target.value) });
                        reset();
                    }}
                />
                :
                <Input
                    id="pixel"
                    className="text-center text-6xl h-fit"
                    type="text"
                    value={
                        isStart === "stop"
                            ? state.minute.toString().padStart(2, "0")
                            : Math.floor((timeLeft / 1000 / 60) % 60)
                                  .toString()
                                  .padStart(2, "0")
                    }
                    onChange={(e) => {
                        setIsStart("stop");
                        setState({
                            ...state,
                            minute: parseInt(e.target.value),
                        });
                        reset();
                    }}
                />
                :
                <Input
                    id="pixel"
                    className="text-center text-6xl h-fit"
                    type="text"
                    value={
                        isStart === "stop"
                            ? state.second.toString().padStart(2, "0")
                            : ((timeLeft / 1000) % 60)
                                  .toString()
                                  .padStart(2, "0")
                    }
                    onChange={(e) => {
                        setIsStart("stop");
                        setState({
                            ...state,
                            second: parseInt(e.target.value),
                        });
                        reset();
                    }}
                />
            </div>
            <div id="control" className="flex flex-row gap-2 items-center">
                <div
                    id="timeController"
                    className="flex flex-1 flex-row gap-2 items-center"
                >
                    <Button
                        variant="outline"
                        onClick={() => {
                            setIsStart("stop");
                            addTime(3600);
                            reset();
                        }}
                    >
                        + 1h
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setIsStart("stop");
                            addTime(60);
                            reset();
                        }}
                    >
                        + 1m
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setIsStart("stop");
                            addTime(30);
                            reset();
                        }}
                    >
                        + 30s
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setIsStart("stop");
                            addTime(10);
                            reset();
                        }}
                    >
                        + 10s
                    </Button>
                </div>
                <div
                    id="playController"
                    className="flex flex-row gap-2 items-center"
                >
                    {isStart === "stop" ? (
                        <Button
                            className="p-3"
                            onClick={() => {
                                setIsStart("start");
                                start(initialTime);
                            }}
                        >
                            <Play className="w-4 h-4" />
                        </Button>
                    ) : (
                        <>
                            {isStart === "pause" ? (
                                <Button
                                    variant="outline"
                                    className="p-3"
                                    onClick={() => {
                                        setIsStart("start");
                                        resume();
                                    }}
                                >
                                    <Play className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    variant="outline"
                                    className="p-3"
                                    onClick={() => {
                                        setIsStart("pause");
                                        pause();
                                    }}
                                >
                                    <Pause className="w-4 h-4" />
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                className="p-3"
                                onClick={() => {
                                    setIsStart("stop");
                                    reset();
                                }}
                            >
                                <Square className="w-4 h-4" />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Timer;
