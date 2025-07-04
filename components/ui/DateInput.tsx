"use client";

import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface DateInputProps {
    field: ControllerRenderProps<any, any>;
    placeholder?: string;
}

export const DateInput = ({ field, placeholder }: DateInputProps) => {

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
        }
        if (value.length > 5) {
            value = `${value.slice(0, 5)}/${value.slice(5, 9)}`;
        }
        field.onChange(value);
    };

    let displayValue = "";
    if (field.value) {
        if (field.value instanceof Date) {
            displayValue = format(field.value, "dd/MM/yyyy");
        }
        else {
            displayValue = field.value;
        }
    }

    return (
        <Input
            placeholder={placeholder || "DD/MM/AAAA"}
            value={displayValue}
            onChange={handleDateChange}
        />
    );
};