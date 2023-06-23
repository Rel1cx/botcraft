import { Button } from "@ariakit/react"
import { Container, Group, Text, Title } from "@mantine/core"

import { Router } from "@/router"

import * as css from "./styles.css"

const NotFound = () => {
    return (
        <Container className={css.root}>
            <div className={css.label}>404</div>
            <Title className={css.title}>You have found a secret place.</Title>
            <Text color="dimmed" size="lg" align="center" className={css.description}>
                Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to
                another URL.
            </Text>
            <Group position="center">
                <Button
                    className={css.button}
                    as="button"
                    clickOnEnter
                    clickOnSpace
                    onClick={() => {
                        Router.replace("Home")
                    }}
                >
                    Take me back to home page
                </Button>
            </Group>
        </Container>
    )
}

export default NotFound
