import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { ArrowDown01Icon, DeleteIcon, PencilIcon, PlusCircleIcon } from 'lucide-react'
import React, { FC, useState } from 'react'
type ICourceContentProps = {
    active: number,
    setActive: (active: number) => void,
    courceContentData: any,
    setCourceContentData: (setCourceContentData: any) => void,
    handleSubmit: any
}
const CourceContent: FC<ICourceContentProps> = ({
    active,
    setActive,
    courceContentData,
    setCourceContentData,
    handleSubmit: handleCourceSubmit
}) => {
    const [isCollpsed, setIsCollpsed] = useState(
        Array(courceContentData.length).fill(false)
    )
    const [activeSection, setActiveSection] = useState(0);
    const handleSubmit = (e: any) => {
        e.preventDefault();

    }
    const handleCollapseToggle = (index: number) => {
        const updatedCollapse = { ...isCollpsed };
        updatedCollapse[index] = !updatedCollapse[index];
        setIsCollpsed(updatedCollapse)
    }

    const handleDeleteLink = (index: number, linkIndex: number) => {
        const updatedDate = [...courceContentData];
        updatedDate[index].links.splice(linkIndex, 1)
        setCourceContentData(updatedDate)
    }
    const handleAddLink = (index: number) => {
        const updatedDate = [...courceContentData];
        updatedDate[index].links.push({ title: "", url: "" })
        setCourceContentData(updatedDate)
    }

    const handleNewContent=(item:any)=>{
        if(item.title === "" || item.description ===" " || item.videoUrl === "" || item.videoSection ==="" ||item.links[0].title === "" ||item.links[0].url === "")
        {
            toast({
                description:"Can Not Create new content"
            })
        }
        else{
            let newVideoSection="";
            if(courceContentData.length>0)
            {
                const lastVideoSection=courceContentData[courceContentData.length -1 ].videoSection;
             if(lastVideoSection)
             {
                newVideoSection=lastVideoSection
             }
            }
            
            const newCource={
                videoUrl:"",
                title:"hello",
                description:"",
                videoSection:"untitled Section",
                links:[{title:"sds",url:"ds"}],
                suggestions:"",
            }
            setCourceContentData([...courceContentData,newCource])
        }
    }
    const handleNewSection=()=>{
     if(
        courceContentData[courceContentData.length -1].title === "" ||
        courceContentData[courceContentData.length -1].description ==="" ||
        courceContentData[courceContentData.length -1].videoUrl ==="" ||
        courceContentData[courceContentData.length -1].videoSection ==="" ||
        courceContentData[courceContentData.length -1].links[0].title ==="" ||
        courceContentData[courceContentData.length -1].links[0].url ===""

     ){
            toast({
                description:"Can Not Create new Section"
            })
     }
     else{
        setActiveSection((prev)=>prev+1);
         const newCource={
            videoUrl:"",
            title:"hello",
            description:"",
            videoSection:`untitled Section ${activeSection}`,
            links:[{title:"",url:""}],
            suggestions:"",
        }
        setCourceContentData([...courceContentData,newCource])
     }
    }


    const prevButton=()=>{
    setActive(active -1);
    }
    const handleOption=()=>{
        if(
            courceContentData[courceContentData.length -1].title === "" ||
            courceContentData[courceContentData.length -1].description ==="" ||
            courceContentData[courceContentData.length -1].videoUrl ==="" ||
            courceContentData[courceContentData.length -1].videoSection ==="" ||
            courceContentData[courceContentData.length -1].links[0].title ==="" ||
            courceContentData[courceContentData.length -1].links[0].url ===""
    
         ){
                toast({
                    description:"Can Not Create new Section"
                })
         }
         else{
            setActive(active +1);

         
         handleCourceSubmit();
         }
        }
    return (

        <>
            <div className='w-[80%] m-auto mt-26 p-3'>
                <form onSubmit={handleSubmit}>
                    {
                        courceContentData.map((item: any, index: number) => {
                            const showSectionInput = index === 0 || item.videoSection !== courceContentData[index - 1].videoSection;
                            return (
                                <div className={`w-full bg-slate-700 p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}>
                                    {
                                        showSectionInput && (
                                            <>
                                                <div className='flex w-full items-center'>
                                                    <input type="text"
                                                        className={
                                                            `text-[20px] ${item.videoSection === "untitled Section" ? "w-[170px]" : "w-max"} cursor-pointer bg-transparent outline-none`
                                                        }
                                                        value={item.videoSection}
                                                        onChange={(e) => {
                                                            const updatedData = [...courceContentData];
                                                            updatedData[index].videoSection = e.target.value;
                                                            setCourceContentData(updatedData);
                                                        }}
                                                    />
                                                    <PencilIcon className='cursor-pointer' size={24} />
                                                </div>
                                            </>
                                        )
                                    }
                                    <div className='flex w-full items-center justify-between my-0'>
                                        {
                                            isCollpsed[index] ? (
                                                <>
                                                    {
                                                        item.title ? (<p className='font-serif  '>
                                                            {index + 1}.s{item.title}

                                                        </p>) : <> </>
                                                    }
                                                </>
                                            ) : (<> </>)
                                        }

                                        <div className="flex justify-end">

                                            <DeleteIcon
                                                className={`text-[20px] mr-2 ${index > 1 ? "cursor-pointer" : "cursor-no-drop"}" `}
                                                onClick={() => {
                                                    const updatedDate = [...courceContentData];
                                                    updatedDate.splice(index, 1);
                                                    setCourceContentData(updatedDate)
                                                }}
                                            />
                                            <ArrowDown01Icon
                                                fontSize={"2xl"}
                                                style={{
                                                    transform: isCollpsed[index] ? "rotate(180deg)" : "rotate(0deg)"
                                                }}
                                                onClick={() => handleCollapseToggle(index)}
                                            />
                                        </div>
                                    </div>
                                    {
                                        !isCollpsed[index] && (
                                            <>
                                                <div className='my-3'>
                                                    <Label>
                                                        video Title
                                                    </Label>
                                                    <Input type="text"
                                                        placeholder='Enter Video Titles'
                                                        value={item.title}
                                                        onChange={(e) => {
                                                            const updatedData = [...courceContentData];
                                                            updatedData[index].title = e.target.value;
                                                            setCourceContentData(updatedData);
                                                        }}
                                                    />
                                                </div>
                                                <div className='my-3'>
                                                    <Label>
                                                        video URL
                                                    </Label>
                                                    <Input type="text"
                                                        placeholder='Enter Video URL'
                                                        value={item.videoUrl}
                                                        onChange={(e) => {
                                                            const updatedData = [...courceContentData];
                                                            updatedData[index].videoUrl = e.target.value;
                                                            setCourceContentData(updatedData);
                                                        }}
                                                    />
                                                </div>

                                                <div className='my-3'>
                                                    <Label>
                                                        video URL
                                                    </Label>
                                                    <Textarea
                                                        placeholder='Enter Video URL'
                                                        value={item.description}
                                                        onChange={(e) => {
                                                            const updatedData = [...courceContentData];
                                                            updatedData[index].description = e.target.value;
                                                            setCourceContentData(updatedData);
                                                        }}
                                                    />
                                                </div>
                                                <div className='my-3'>

                                                    {
                                                        item.links.map((link: any, linkIndex: number) => (
                                                            <div className='mb-3 '>
                                                                <div className='w-full flex items-center justify-between'>
                                                                    <Label >
                                                                        link {linkIndex + 1}
                                                                    </Label>
                                                                    <DeleteIcon
                                                                        className={`text-[20px] mr-2 ${index > 1 ? "cursor-pointer" : "cursor-no-drop"}" `}
                                                                        onClick={() => {
                                                                            linkIndex === 0 ? null : handleDeleteLink(index, linkIndex)
                                                                        }} />
                                                                </div>
                                                                <Input type="text"
                                                                    placeholder='SourceCode (Link Title)....'
                                                                    value={link.title}
                                                                    onChange={(e) => {
                                                                        const updatedData = [...courceContentData];
                                                                        updatedData[index].links[linkIndex].title = e.target.value;
                                                                        setCourceContentData(updatedData);
                                                                    }}
                                                                />
                                                                <Input type="text"
                                                                    placeholder='SourceCode (Link URL)....'
                                                                    value={link.url}
                                                                    onChange={(e) => {
                                                                        const updatedData = [...courceContentData];
                                                                        updatedData[index].links[linkIndex].url = e.target.value;
                                                                        setCourceContentData(updatedData);
                                                                    }}
                                                                />

                                                            </div>

                                                        ))
                                                    }
                                                    <div className='inline-block mb-4'>
                                                        <p className='flex items-center text-[18px]' onClick={() => handleAddLink(index)}>
                                                            <PlusCircleIcon /> add Link
                                                        </p>
                                                    </div>
                                                </div>

                                                <br />
                                                {
                                                    index === courceContentData.length - 1 && (
                                                        <div className='inline-block mb-4'>
                                                            <p className='flex items-center text-[18px]' onClick={() => handleNewContent(item)}>
                                                                <PlusCircleIcon /> add new Content
                                                            </p>
                                                        </div>
                                                    )
                                                }



                                            </>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                     <div className='inline-block mt-4'>
                                                            <p className='flex items-center text-[18px]' onClick={() => handleNewSection()}>
                                                                <PlusCircleIcon /> add New Section
                                                            </p>
                                                        </div>
                </form>
                <br />
                <br />
                
              <div className='w-full flex justify-between'>
                  <Button onClick={prevButton}>prev</Button>
                  <Button onClick={handleOption}>Next</Button>


              </div>
            </div>

        </>
    )
}

export default CourceContent