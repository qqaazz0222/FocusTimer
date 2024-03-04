import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Link, RotateCcw, X } from "lucide-react";
import Img1 from "../public/images/2-1.png";
import Img2 from "../public/images/2-2.png";
import Image from "next/image";

const Help = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="flex flex-row items-center justify-between gap-4 text-sm">
                <Button
                    variant="link"
                    className="text-slate-500"
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                >
                    노래 재생중, 광고가 나오시나요?
                </Button>
            </div>
            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader className="flex flex-row items-center justify-end">
                        <Button
                            variant="outline"
                            className="w-fit h-fit p-3"
                            onClick={() => {
                                setIsOpen(!isOpen);
                            }}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </AlertDialogHeader>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        1. 유튜브용 애드 블록 설치
                    </h4>
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-sm text-muted-foreground">링크 :</p>
                        <a
                            href="https://chromewebstore.google.com/detail/%EC%9C%A0%ED%8A%9C%EB%B8%8C-%EC%9A%A9-%EC%95%A0%EB%93%9C-%EB%B8%94%EB%A1%9D/cmedhionkhpnakcndndgjdbohmhepckk"
                            target="_blank"
                        >
                            <Button variant="outline" className="p-3 gap-2">
                                유튜브용 애드 블록
                                <Link className="w-4 h-4" />
                            </Button>
                        </a>
                    </div>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        2. 확장 프로그램 설정
                    </h4>
                    <blockquote className="border-l-2 pl-6 italic">
                        크롬 메뉴 -&#62; 확장 프로그램 -&#62; 확장 프로그램 관리
                    </blockquote>
                    <p className="text-sm font-semibold">2-1. 세부정보</p>
                    <Image
                        src={Img1}
                        className="w-full object-contain"
                        alt="img-2-1"
                    />
                    <p className="text-sm font-semibold">
                        2-2. 시크릿 모드에서 허용
                    </p>
                    <Image src={Img2} className="w-full" alt="img-2-2" />
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        3. 페이지 새로고침
                    </h4>
                    <div className="flex flex-row items-center gap-2">
                        <Button
                            variant="outline"
                            className="p-3 gap-2"
                            onClick={() => {
                                location.reload();
                            }}
                        >
                            새로고침
                            <RotateCcw className="w-4 h-4" />
                        </Button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default Help;
