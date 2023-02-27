'use client';
import clsx from 'clsx';
import Link from 'next/link';

function LinkPassComp({ className, children, ...passProps }) {
    return (
        <Link {...passProps} className={className}>
            {children}
        </Link>
    );
}

function Button({
    children,
    href,
    aHref,
    onClick,
    color,
    primary,
    secondary,
    contain,
    outline,
    text,
    sm,
    lg,
    md,
    rounded = false,
    square = false,
    disabled = false,
    className,
    ...passProps
}) {
    if (!contain && !outline && !text) {
        contain = true;
    }
    if (!primary && !secondary) {
        primary = true;
    }
    if (!sm && !md && !lg) {
        md = true;
    }
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (href) {
        props.href = href;
        Comp = LinkPassComp;
    }
    if (aHref) {
        props.href = aHref;
        props.target = '_blank';
        props.rel = 'noopener noreferrer';
        Comp = 'a';
    }
    const classes = clsx('btn', {
        'btn-contain': contain,
        'btn-outline': outline,
        'btn-text': text,

        'btn-primary': primary,
        'btn-secondary': secondary,

        'btn-sm': sm,
        'btn-md': md,
        'btn-lg': lg,

        'rounded-full': rounded,
        'btn-square': square,
        'btn-disabled': disabled,

        [className]: className,
    });

    return (
        <Comp className={classes} {...props}>
            {children}
        </Comp>
    );
}

export default Button;
