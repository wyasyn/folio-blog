import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export interface FormEmailProps {
  message: string;
  email: string;
  name: string;
  subject: string;
}

export default function Email({
  message,
  subject,
  email,
  name,
}: FormEmailProps) {
  // Basic prop validation
  if (!message || !email || !name || !subject) {
    throw new Error("All props are required for the email component.");
  }

  return (
    <Html>
      <Head>
        <title>New Message from {name}</title>
      </Head>
      <Preview>
        {name ? `New message from ${name}` : "You have a new message!"}
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-gray-900">
          <Container className="my-6 p-4">
            <Section className="bg-white border border-gray-200 shadow-sm rounded-lg px-8 py-6">
              <Heading className="text-lg font-semibold text-gray-800">
                {subject || "No Subject"}
              </Heading>
              <Text className="mt-4 text-gray-700">{message}</Text>
              <Hr className="my-6 border-t border-gray-300" />
              <Text className="text-sm text-gray-600">
                Sent by: <strong>{name}</strong> <br />
                Contact:{" "}
                <a href={`mailto:${email}`} className="text-blue-600">
                  {email}
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
