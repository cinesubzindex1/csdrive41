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


      <PreviewInformation file={data} />
    </div>
  );
}
