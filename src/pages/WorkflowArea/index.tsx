import { Text } from "@mantine/core"

import { AvatarList } from "@/components/AvatarList"

import RootLayout from "../RootLayout"

const WorkflowArea = () => {
    return (
        <RootLayout nav={<AvatarList />} navHeader="Flow">
            {/* <Suspense>{contentView}</Suspense> */}
        </RootLayout>
    )
}

export default WorkflowArea
