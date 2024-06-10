"use client";

import { useState } from "react";
import { z } from "zod";

import { Status } from "~/components/Global";
import {
  PreviewAudio,
  PreviewDocument,
  PreviewImage,
  PreviewInformation,
  PreviewManga,
  PreviewRich,
  PreviewUnknown,
  PreviewVideo,
} from "~/components/Preview";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

import { cn } from "~/utils/cn";
import { getFileType } from "~/utils/previewHelper";

import { Schema_File } from "~/types/schema";

import config from "config";

type Props = {
  data: z.infer<typeof Schema_File>;
  fileType: "unknown" | ReturnType<typeof getFileType>;
};
export default function PreviewLayout({ data, fileType }: Props) {
  const [view, setView] = useState<"markdown" | "raw">("markdown");
  return (
    <div
      slot='preview-container'
      className='flex flex-col gap-3'
    >
      <Card>
        <CardHeader className='pb-0'>
          <div
            className={cn(
              "flex flex-col gap-3 overflow-hidden",
              "mobile:flex-row mobile:items-center mobile:justify-between",
            )}
          >
            <h3 className='line-clamp-1 flex-grow whitespace-pre-wrap break-all'>{data.name}</h3>
            {["text", "markdown", "code"].includes(fileType) && (
              <div className='flex w-full items-center mobile:w-fit'>
                <Button
                  size={"sm"}
                  variant={view === "markdown" ? "default" : "outline"}
                  onClick={() => setView("markdown")}
                  className='w-full rounded-r-none mobile:w-fit'
                >
                  Markdown
                </Button>
                <Button
                  size={"sm"}
                  variant={view === "raw" ? "default" : "outline"}
                  onClick={() => setView("raw")}
                  className='w-full rounded-l-none mobile:w-fit'
                >
                  Raw
                </Button>
              </div>
            )}
          </div>
          <Separator />
        </CardHeader>

      

      <PreviewInformation file={data} />
    </div>
  );
}
