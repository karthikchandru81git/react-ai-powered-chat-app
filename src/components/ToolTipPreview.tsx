import { Tooltip } from "radix-ui";
import type React from "react";

type ToolTipPreviewType = {
    text:string,
    children: React.ReactNode
}
function ToolTipPreview({ text, children }:ToolTipPreviewType) {
    return (
        <>
            <Tooltip.Provider>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        {children}
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content className="TooltipContent" sideOffset={15} side="right">
                            <strong>{text}</strong>
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.Provider>
        </>
    )
}

export default ToolTipPreview