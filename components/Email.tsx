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
  Link,
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
        <title>{`New Message from ${name}`}</title>
      </Head>
      <Preview>
        New message from {name}: {subject}
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-gray-900">
          <Container className="mx-auto my-8 p-4 max-w-xl rounded-xl shadow-sm">
            <Section className="bg-white border border-gray-200 shadow-lg rounded-lg px-8 py-6">
              <Heading className="text-xl font-bold text-gray-800 mb-4">
                New Message from {name}
              </Heading>
              <Text className="text-lg font-semibold text-gray-700 mb-2">
                Subject: {subject}
              </Text>
              <Text className="mt-4 text-gray-700 whitespace-pre-wrap">
                {message}
              </Text>
              <Hr className="my-6 border-t border-gray-300" />
              <Text className="text-sm text-gray-600">
                Sent by: <strong>{name}</strong>
              </Text>
              <Link
                href={`mailto:${email}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {email}
              </Link>
            </Section>
            <Text className="text-xs text-center text-gray-500 mt-4">
              This email was sent from the contact form on ywalum.com
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
