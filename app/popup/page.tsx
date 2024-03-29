"use client";
// 라이브러리
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
// 컴포넌트
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Timer from "@/components/timer";
// 아이콘
import {
    VolumeX,
    Volume2,
    Play,
    Pause,
    ArrowUpRightFromSquare,
} from "lucide-react";

export default function PopUp() {
    const videoRef = useRef();
    const [video, setVideo] = useState(
        "https://www.youtube.com/embed/MZgO_k2VjMg"
    );
    const [videoState, setVideoState] = useState({
        playing: false, // 재생중인지
        muted: false, // 음소거인지
        controls: false, // 기본으로 제공되는 컨트롤러 사용할건지
        volume: 0.5, // 볼륨크기
        playbackRate: 1.0, // 배속
        played: 0, // 재생의 정도 (value)
        seeking: false, // 재생바를 움직이고 있는지
        duration: 0, // 전체 시간
    });
    const [timerState, setTimerState] = useState({
        hour: 0,
        minute: 30,
        second: 0,
    });
    const genreList = ["발라드", "댄스", "어쿠스틱", "힙합", "팝", "Lo-Fi"];
    const [genre, setGenre] = useState(genreList[0]);
    const playPauseHandler = () => {
        setVideoState({ ...videoState, playing: !videoState.playing });
    };
    const volumeChangeHandler = (e: any) => {
        setVideoState({
            ...videoState,
            volume: e[0] / 100,
            muted: e[0] === 0 ? true : false,
        });
    };
    return (
        <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden">
            <Card className="w-full max-w-[480px]">
                <CardContent className="flex flex-col gap-5 pt-6">
                    <div className="flex flex-row items-center gap-4">
                        {videoState.volume === 0 ? (
                            <VolumeX className="w-6 h-6" />
                        ) : (
                            <Volume2 className="w-6 h-6" />
                        )}

                        <Slider
                            defaultValue={[50]}
                            max={100}
                            step={1}
                            onValueChange={volumeChangeHandler}
                        />
                    </div>
                    <Timer state={timerState} setState={setTimerState} />
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-row items-center gap-2">
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="장르" />
                                </SelectTrigger>
                                <SelectContent>
                                    {genreList.map((genre) => (
                                        <SelectItem value={genre} key={genre}>
                                            {genre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {videoState.playing ? (
                                <Button
                                    variant="outline"
                                    className="p-3"
                                    onClick={playPauseHandler}
                                >
                                    <Pause className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    className="p-3"
                                    onClick={playPauseHandler}
                                >
                                    <Play className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                    <ReactPlayer
                        ref={videoRef}
                        url={video} // 서버에서 받아온 video url
                        playing={videoState.playing} // true = 재생중 / false = 멈춤
                        controls={false} // 기본 컨트롤러 사용 x
                        muted={videoState.muted} // 음소거인지
                        volume={videoState.volume} // 소리조절 기능
                        width="0"
                        height="0"
                    />
                </CardContent>
            </Card>
        </main>
    );
}
