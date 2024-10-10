"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import React from "react"



const FindTopTalent = () => {

  const talents = [
    {name:"John Smith",role:"Software Engineer",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus ullamcoe nisl risus, ", pic:"/worker1.svg"},
    {name:"Emily Davis",role:"Interior Designer",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus ullamcoe nisl risus, ", pic:"/worker2.svg"},
    {name:"Robert Brown",role:"Graphic Designer",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus ullamcoe nisl risus, ", pic:"/worker3.svg"},
    {name:"Momina Nadeem",role:"Web Developer",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus ullamcoe nisl risus, ", pic:"/worker1.svg"},
    {name:"Maryam Nadeem",role:"Graphic Designer",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus ullamcoe nisl risus, ", pic:"/worker2.svg"},
    {name:"John Doe",role:"Software Engineer",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus ullamcoe nisl risus, ", pic:"/worker3.svg"},
    {name:"Jane Smith",role:"Full Stack Engineer",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus ullamcoe nisl risus, ", pic:"/worker1.svg"},
    {name:"Jane Doe",role:"ML Engineer",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus ullamcoe nisl risus, ", pic:"/worker2.svg"}
     
  ]

    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(0); // Number of cards visible per slide
    const totalCards =  talents.length;
    const [clickCount, setClickCount] = useState(0)
    const [btnStyle, setBtnStyle] = useState(false)
    const [btnStyle1, setBtnStyle1] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    const prevSlide = () => {
        if (currentIndex > 0) {
            // Check if there are previous cards to slide
            const newIndex = Math.max(currentIndex - visibleCards, 0);
            setCurrentIndex(newIndex);
            changeBtnStyle(newIndex)
            setClickCount(clickCount - 1)
       //     setBtnStyle(true)
        }
       

    };



    const changeBtnStyle = (newIndex:number) => {
        if (newIndex === 0) {
            setBtnStyle1(false)
        }
        else {
            setBtnStyle1(true);  
        }
        if (newIndex >= totalCards - visibleCards) {
            setBtnStyle(false)
        }
        else {
            setBtnStyle(true)
        }
    }

    const nextSlide = () => {
        if (currentIndex < totalCards - visibleCards) {
            // Check if there are remaining cards to slide
            const newIndex = currentIndex + visibleCards
            setCurrentIndex(newIndex); // Move to next group of cards
            setClickCount(clickCount + 1)
            changeBtnStyle(newIndex);
        }
        // setStyle("-translate-x-50  2xl:-translate-x-30 overflow-x-visible")
    }

    useEffect(() => {
        const updateVisibleCards = () => {
            if (window.innerWidth >= 1480) {
                setVisibleCards(3); // for larger screens
                //        setgap(70)
            }
            else {
                setVisibleCards(2)
            }
        };

        updateVisibleCards();

        if (totalCards-visibleCards!=0){
            setBtnStyle(true)
        }

        window.addEventListener("resize", updateVisibleCards);
        return (
            () => window.removeEventListener("resize", updateVisibleCards)
        )
    }, [])

    const translation = cardRef.current ? `-${currentIndex * (cardRef.current.scrollWidth + 89)}px` : '0';

    return (
        <div className="w-full bg-[#F9F9F9] flex">
            <div className="py-[68px]  w-full flex flex-col gap-y-[40px] lg:gap-y-[60px] px-[30px] md:px-[50px] xl:px-[85px] 2xl:max-w-[1536px] 2xl:mx-auto">
                <div className="flex gap-y-[30px] w-full justify-center lg:justify-between items-center">
                    <div className="w-full  flex justify-center lg:justify-start">
                        <h1 className="font-[500] text-black leading-[50px] text-center lg:text-start lg:leading-[60px] text-[clamp(40px,4vw,48px)]" >Find Top Talent</h1>
                    </div>
                    <div className="hidden lg:flex gap-[20px] justify-end w-full lg:w-1/2">
                        <button className={`p-[10px]  border  border-blue-600 flex items-center justify-center ${btnStyle1 === true ? "bg-blue-600" : "bg-transparent"}   rounded-[9px] w-[48px] lg:w-[58px] h-[48px] lg:h-[60px]`} onClick={prevSlide}>
                            <ChevronLeft size={30} className={`${btnStyle1 === true ? "text-white" : "text-blue-600"}`} />
                        </button>
                        <button className={`p-[10px] group border border-blue-600 hidden lg:flex items-center ${btnStyle === true ? "bg-blue-600" : "bg-transparent"}  justify-center  rounded-[9px] w-[48px] lg:w-[58px] h-[48px] lg:h-[60px]`} onClick={nextSlide}>
                            <ChevronRight size={30} className={`${btnStyle === true ? "text-white" : "text-blue-600"}`} />
                        </button>
                    </div>
                </div>
                <p className="max-w-[900px] text-center lg:text-start font-epilogue  text-gray-500 text-[16px] font-[500]">Browse through our curated list of highly skilled candidates, ready to join your team. Whether you need temporary workers or specialized professionals, Tempify has the right fit for you. </p>

                <div className={`flex pb-[30px] w-full overflow-scroll lg:overflow-hidden`} >
                    <div className={`flex h-fit gap-[30px] md:gap-[45px] lg:gap-[89px] transition-transform ease-in-out  transform  duration-500 w-full`} style={{ transform: `translateX(${translation})` }}>
                        {talents.map((talent: any, index: number) => { //keys:["id1","id2","id3","id4"]
                            // const item = localeTalent.talents[key]; // Access talent data by key
                            return (<div ref={cardRef} className={`flex flex-col  p-[5px] min-w-[315px] w-[300px] md:min-w-[350px]  lg:w-[380px] lg:min-w-[380px] bg-white rounded-[8px] shadow-talent_shadow`} key={index}>
                                <div className="flex flex-col w-full overflow-hidden h-[250px] md:h-[300px] lg:h-[350px]">
                                    <Image width={354} height={340} src={talent.pic} alt="" className="w-full" />
                                </div>
                                <div className="flex flex-col w-full gap-[9px] p-[20px]">
                                    <h2 className="text-[25px] font-[600] font-jakarta text-[#01161E]">{talent.name}</h2>
                                    <p className="text-[16px] font-[500] font-epilogue text-gray-500">{talent.role}</p>
                                    <p className="text-[16px] font-[500] font-epilogue text-gray-500">{talent.description}</p>
                                    <Link href="#" className="bg-blue-600 text-[14px] lg:text-[16px] h-[47px] flex items-center justify-center text-white max-w-[282px] text-center rounded-[8px]">
                                        <div className="flex items-center  gap-[10px]">
                                            <p>Get started as a company</p>
                                            <ChevronRight size={30} className="text-white" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
                <div className="hidden lg:flex w-full justify-center items-center gap-[15px]">
                    {totalCards && visibleCards > 0 &&
                        Array.from({ length:(Math.ceil(totalCards/visibleCards))}).map((_, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`flex ${clickCount === index ? "bg-blue-600 w-[35px]" : "bg-[#D9D9D9] w-[12px] md:w-[15px]"} h-[12px] md:h-[15px]`}
                                >
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default FindTopTalent