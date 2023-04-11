import { useInjection } from 'inversify-react';
import React from 'react';
import { IIconService } from '../../services/IconService';

import { anton } from '../shared/Font';

export const Logo: React.FC = () => {
    const iconService = useInjection(IIconService.$);
    const Icon = iconService.getWithDefault("skills");

    return (
        <div className={`logo ${anton.className}`} >
            <span>DC</span>
            <Icon />
        </div>
    )
}