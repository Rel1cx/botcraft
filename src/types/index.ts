import type { StrictOmit } from "ts-essentials";

import type { ChatData } from "@/bot/types";
import type { Model } from "@/zod";
import type { MessageID } from "@/zod/id";

export type TotalTokenUsed = {
    [model in Model]?: {
        promptTokens: number;
        completionTokens: number;
    };
};

export type ChatItem = StrictOmit<ChatData, "content"> & {
    messages: MessageID[];
};

export type ChatCompletionTask =
    | {
          type: "init";
          messageID: MessageID;
      }
    | {
          type: "pending";
          messageID: MessageID;
          abort: () => void;
      }
    | {
          type: "done";
          messageID: MessageID;
      }
    | {
          type: "error";
          messageID: MessageID;
          error: Error;
      };
