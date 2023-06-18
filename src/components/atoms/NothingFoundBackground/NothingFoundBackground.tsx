import { Button, Container, createStyles, Group, rem, Text, Title } from "@mantine/core"
import * as React from "react"

import { Illustration } from "./Illustration"

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: rem(80),
        paddingBottom: rem(80),
    },

    inner: {
        position: "relative",
    },

    content: {
        paddingTop: rem(220),
        position: "relative",
        zIndex: 1,

        [theme.fn.smallerThan("sm")]: {
            paddingTop: rem(120),
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: "center",
        fontWeight: 900,
        fontSize: rem(38),

        [theme.fn.smallerThan("sm")]: {
            fontSize: rem(32),
        },
    },

    description: {
        maxWidth: rem(540),
        margin: "auto",
        marginTop: theme.spacing.xl,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },
}))

const NothingFoundBackground = React.memo(() => {
    const { classes } = useStyles()

    return (
        <Container className={classes.root}>
            <div className={classes.inner}>
                <Illustration
                    style={{
                        opacity: 0.75,
                    }}
                />
                <div className={classes.content}>
                    <Title className={classes.title}>Nothing to see here</Title>
                    <Text color="dimmed" size="lg" align="center" className={classes.description}>
                        Page you are trying to open does not exist. You may have mistyped the address, or the page has
                        been moved to another URL. If you think this is an error contact support.
                    </Text>
                    <Group position="center">
                        <Button size="md">Take me back to home page</Button>
                    </Group>
                </div>
            </div>
        </Container>
    )
})

export default NothingFoundBackground
