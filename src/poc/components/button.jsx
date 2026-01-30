import { ArrowUpRightCircle } from 'iconoir-react'

const Button = ({ children, icon, className, variant = "default", size = "default", onClick, href, showIcon = true }) => {
    const isSmall = size === "small"
    const containerSize = isSmall ? "w-fit py-[6px] pr-[6px] pl-[24px]" : "w-fit py-[8px] pr-[8px] pl-[28px]"
    const textSize = isSmall ? "text-[16px]" : "text-[18px]"
    const iconBoxSize = isSmall ? "w-10 h-10" : "w-12 h-12"
    
    let buttonClasses = ''
    
    if (variant === "squared") {
        buttonClasses = `flex items-center justify-center px-6 py-3 text-[#F5F2EB] text-center font-semibold rounded-lg text-sm bg-gradient-to-t from-[#513B3B] to-[#110000] shadow-[0_4px_12px_0_rgba(17,0,0,0.3)] hover:shadow-[0_6px_16px_0_rgba(17,0,0,0.4)] transition-all duration-200 ${className}`
    } else if (variant === "transparent") {
        const justifyClass = showIcon ? "justify-between" : "justify-center"
        const paddingClass = showIcon ? containerSize : (isSmall ? "w-fit py-[6px] px-[24px]" : "w-fit py-[8px] px-[28px]")
        buttonClasses = `flex ${paddingClass} items-center ${justifyClass} gap-4 text-[#F5F2EB] text-center font-semibold rounded-full ${textSize} bg-transparent border border-[#F5F2EB]/40 hover:border-[#F5F2EB]/70 transition-all duration-200 ${className}`
    } else {
        buttonClasses = `flex ${containerSize} items-center justify-between gap-4 text-[#F5F2EB] text-center font-semibold tracking-wide rounded-full ${textSize} bg-gradient-to-t from-[#513B3B] to-[#110000] shadow-[0_0_0_4px_rgba(81,59,59,0.5),0_12px_24px_-8px_rgba(17,0,0,0.4)] hover:shadow-[0_0_0_4px_rgba(81,59,59,0.6),0_16px_32px_-8px_rgba(17,0,0,0.5)] transition-all duration-300 ${className}`
    }

    const defaultIcon = <ArrowUpRightCircle className="w-6 h-6 text-[#F5F2EB]" strokeWidth={1.5} />

    const buttonContent = variant === "squared" ? children : (
        <>
            <span className="flex-grow">{children}</span>
            {showIcon && (
                <span className={`flex items-center justify-center ${iconBoxSize} rounded-full bg-[#F5F2EB]/20`}>
                    {icon || defaultIcon}
                </span>
            )}
        </>
    )

    if (href) {
        return (
            <a href={href} className={buttonClasses}>
                {buttonContent}
            </a>
        )
    }

    return (
        <button onClick={onClick} className={buttonClasses}>
            {buttonContent}
        </button>
    )
}

export default Button