import { cn } from "../../../../shared/utils/cn"

type BusinessTypeOptionsProps = {
    selectedValue?: number
    onChange?: (value: number) => void
}

const options = [
    "Doanh nghiệp",
    "Hộ kinh doanh"
]

export default function BusinessTypeOptions({selectedValue = 0, onChange}: BusinessTypeOptionsProps) {

    const handleChange = (value: number) => {
        onChange?.(value)
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 gap-x-6">
            <div className="flex justify-around flex-wrap gap-4 lg:gap-x-6">
                {options.map((item, index) => {
                    const isSelected = index === selectedValue
                    return (
                        <button
                            key={item}
                            className="flex gap-2 items-center cursor-pointer"
                            onClick={() => handleChange(index)}
                        >
                            <div className={cn(
                                'p-1 rounded-full border',
                                isSelected ? 'border-primary' : ''
                            )}>
                                <div className={cn(
                                    'w-3 h-3 rounded-full bg-primary transition',
                                    isSelected ? '' : 'scale-0'
                                )}
                                ></div>
                            </div>
                            <span className="text-dark-400 dark:text-dark-100">{item}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}