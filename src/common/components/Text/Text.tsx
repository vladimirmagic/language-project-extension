import { styled, Typography, TypographyProps } from "@mui/material";
import React from 'react';

export const Text = styled(Typography)<TypographyProps>(({ theme }) => ({
    color: theme.palette.grey[900],
}));
