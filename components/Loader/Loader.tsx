import { Loader, Flex, ThemeProvider, Theme } from "@aws-amplify/ui-react";

const theme: Theme = {
  name: "loader-theme",
  tokens: {
    components: {
      loader: {
        strokeEmpty: { value: "{colors.neutral.20}" },
        strokeFilled: { value: "{colors.green.80}" },
        // sizes
        large: {
          width: { value: "{fontSizes.xxxl}" },
          height: { value: "{fontSizes.xxxl}" },
        },
      },
    },
  },
};

export const Loading = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <Flex direction="column">
      <Loader variation="linear" />
    </Flex>
  </ThemeProvider>
);
