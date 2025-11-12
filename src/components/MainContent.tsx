import { useState, type ChangeEvent } from "react";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { generateText } from "@/lib/chat-completions";
import { LoaderCircle } from 'lucide-react';

export default function MainContent() {
    const [value, setValue] = useState("")
    const [isTranslated, setIstranslated] = useState(false);
    const [selected, setSelected] = useState("France")
    const [generatedText, setGeneratedText] = useState("") 
    const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const formatText = (sentence: string,lang: string) => {
    return `Translate "${sentence}" to ${lang}`
  }


  const handleTextGeneration = () => {
    if(!isTranslated){
        if(value.length <= 1) return
        setIsLoading(true)
    const text = formatText(value, selected)
    generateText(text)
    .then((result)=> {
      setIsLoading(false)
        if(result){
            setGeneratedText(result)
            setIstranslated(true)
        }
    })

    }else{
        setIstranslated(false)
        setValue("")
    }
  }

  return (
    <div className="bg-white shadow-md space-y-4 md:space-y-6 poppins w-full md:w-[80%] lg:w-[50%] xl:w-[35%]">
      <div className="py-10 lg:py-8 title-div flex justify-center items-center gap-2">
        <img
          className="w-[56px] md:w-[60px] lg:w-[64px]"
          src="/parrot.png"
          alt="parrot image"
        />
        <div>
          <p className="big-shoulders text-secondary text-xl md:text-2xl lg:text-3xl font-semibold">
            PollyGlot
          </p>
          <p className="text-background text-sm">
            Perfect Translation Every Time
          </p>
        </div>
      </div>
      <div className="bg-background px-3 md:px-4 lg:px-5 pb-4 md:pb-5 lg:pb-6">
        <div className="px-2 py-3 rounded-md border-black border-2 space-y-2 md:space-y-4">
          <div className="space-y-2 md:space-y-3">
            <p className="text-base md:text-xl text-primary font-semibold">
              Text to translate 👇
            </p>
            <Textarea value={value} onChange={handleChange} className="min-h-[100px] bg-muted py-3 px-2" />
          </div>
          {!isTranslated ? (
            <div className="space-y-2 md:space-y-3 pb-2 md:pb-3">
              <p className="text-base md:text-xl text-primary font-semibold text-center">
                Select language 👇
              </p>
              <div className="pl-2 md:pl-3">
                <RadioGroup 
                    value={selected}
                    onValueChange={setSelected}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="France" id="r1"></RadioGroupItem>
                    <Label htmlFor="r1">
                      France{" "}
                      <img
                        src="/fr-flag.png"
                        className="w-[24px]"
                        alt="frnace flag"
                      />{" "}
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="Spanish" id="r2"></RadioGroupItem>
                    <Label htmlFor="r2">
                      Spanish{" "}
                      <img
                        src="/sp-flag.png"
                        className="w-[24px]"
                        alt="spanish flag"
                      />{" "}
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="Japanese" id="r3"></RadioGroupItem>
                    <Label htmlFor="r3">
                      Japanese{" "}
                      <img
                        src="/jpn-flag.png"
                        className="w-[24px]"
                        alt="japanese flag"
                      />{" "}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          ) : (
            <div className="space-y-2 md:space-y-3 pb-2 md:pb-3">
              <p className="text-base md:text-xl text-primary font-semibold">
                Your translation 👇
              </p>
              <Textarea value={generatedText} className="min-h-[100px] bg-muted py-3 px-2" />
            </div>
          )}
          <Button disabled={value.length <= 1} onClick={handleTextGeneration} className="w-full text-base md:text-xl font-bold text-white" variant={"default"}>
            {
                !isTranslated && isLoading
                ?  <LoaderCircle className="animate-spin" />
                : !isTranslated
                ? "Translate"
                : "Start Over"
            }
          </Button>
        </div>
      </div>
    </div>
  );
}
