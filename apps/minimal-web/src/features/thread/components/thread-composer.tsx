import { ArrowUp } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupTextarea } from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { threadFixture } from "../thread-fixtures";

const modelItems = threadFixture.composer.modelOptions.map((option) => ({
  label: `${option.name} ${option.effort}`,
  value: option.value,
}));

const accessItems = threadFixture.composer.accessOptions.map((option) => ({
  label: option.label,
  value: option.value,
}));

export function ThreadComposer() {
  const [model, setModel] = useState<string>(threadFixture.composer.model);
  const [access, setAccess] = useState<string>(threadFixture.composer.access);
  const selectedModel =
    threadFixture.composer.modelOptions.find((option) => option.value === model) ??
    threadFixture.composer.modelOptions[0];
  const selectedAccess =
    threadFixture.composer.accessOptions.find((option) => option.value === access) ??
    threadFixture.composer.accessOptions[0];

  return (
    <div className="pointer-events-none absolute right-0 bottom-[22px] left-0 z-10 flex justify-center px-6">
      <InputGroup className="pointer-events-auto h-[108px] w-full max-w-[672px] items-stretch rounded-[18px] border-input bg-background shadow-xs">
        <InputGroupTextarea
          aria-label="Message"
          className="min-h-[52px] px-3 pt-3 pb-1 text-sm leading-5 placeholder:text-muted-foreground"
          placeholder={threadFixture.composer.placeholder}
          readOnly
        />
        <InputGroupAddon align="block-end" className="flex w-full justify-between px-3 pt-1 pb-3">
          <div className="flex items-center gap-1.5">
            <Select
              items={modelItems}
              onValueChange={(value) => {
                if (value !== null) setModel(value);
              }}
              value={model}
            >
              <SelectTrigger aria-label="Model" size="sm">
                <SelectValue>
                  <span>
                    {selectedModel.name}{" "}
                    <span className="text-muted-foreground">{selectedModel.effort}</span>
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="start" alignItemWithTrigger={false}>
                <SelectGroup>
                  <SelectLabel>Model</SelectLabel>
                  {threadFixture.composer.modelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <span>
                        {option.name} <span className="text-muted-foreground">{option.effort}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              items={accessItems}
              onValueChange={(value) => {
                if (value !== null) setAccess(value);
              }}
              value={access}
            >
              <SelectTrigger aria-label="Access type" size="sm">
                <SelectValue>{selectedAccess.label}</SelectValue>
              </SelectTrigger>
              <SelectContent align="start" alignItemWithTrigger={false}>
                <SelectGroup>
                  <SelectLabel>Access</SelectLabel>
                  {threadFixture.composer.accessOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <span
              aria-label="Context remaining"
              className="size-5 rotate-[28deg] rounded-full border-2 border-neutral-300 border-t-neutral-600"
              role="img"
            />
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button aria-label="Send message" className="rounded-full" size="icon">
                    <ArrowUp aria-hidden="true" data-icon="inline-start" />
                  </Button>
                }
              />
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
