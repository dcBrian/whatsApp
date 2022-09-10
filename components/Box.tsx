type Props = {
    children: any;
    title?: boolean;
    active?: boolean;
    empty?: boolean;
};

const Box = ({ children, title, active, empty }: Props) => {
    return (
        <div>
            <div
                className={`
                ${empty && 'p-5'}
                ${title && 'uppercase text-lg font-light text-green-600 px-9 py-5'}
                ${active && 'cursor-pointer hover:bg-gray-100'}
              `}
            >
                {children}
            </div>
            <div className={`${!empty && 'border-b ml-16'}`} />
        </div>
    );
};

export default Box;
