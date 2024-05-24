import React from "react";
import { Typography, Container, Box } from "@mui/material";
import Layout from "../components/Layout/Layout.tsx";
import { translate } from "../utils/translation/TranslationUtils.ts";

const Home: React.FC = () => {
    return (
        <Layout>
            <Container maxWidth="md">
                <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        {translate("WELCOME")}
                    </Typography>
                    <Typography variant="h5" component="p" gutterBottom>
                        {translate("WELCOME_SUB")}
                    </Typography>
                </Box>
            </Container>
        </Layout>
    );
};

export default Home;
