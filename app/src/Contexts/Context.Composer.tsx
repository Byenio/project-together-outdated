import { ReactNode } from "react";

interface ComposerInterface {
    components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>,
    children: React.ReactNode
}

export default function Composer(props: ComposerInterface) {

    const { components = [], children } = props;

    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>
            }, children)}
        </>
    )

}