"use client";

import React from "react";
import {ControllerRenderProps} from "react-hook-form";
import {IMaskInput} from "react-imask";

interface PhoneInputProps {

    field: ControllerRenderProps<any, any>;
    placeholder?: string;
}

export const PhoneInput = ({ field, placeholder }: PhoneInputProps) => {
    return (
        <IMaskInput
            mask="(00) 00000-0000"
            unmask={true}
            onAccept={(value) => field.onChange(value)}
            value={field.value || ""}
            placeholder={placeholder || "(00) 00000-0000"}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
    );
};
