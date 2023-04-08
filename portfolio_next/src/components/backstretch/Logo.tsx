import { useInjection } from 'inversify-react';
import React from 'react';
import { IIconService } from '../../services/IconService';

export const Logo: React.FC = () => {
    const iconService = useInjection(IIconService.$);
    const Icon = iconService.getWithDefault("skills");

    return (
        <div className="logo">
            <span>DC</span>
            <Icon />
        </div>
    )
}