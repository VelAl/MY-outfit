import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { T_Order } from "@/app-types-ts";
import { formatUSDPrice } from "@/lib/utils";

import { headingStructure, priceRowsStructure } from "./helpers";

function PurchaseReceiptEmail({ order }: { order: T_Order }) {
  return (
    <Html>
      <Preview>View Order Receipt</Preview>
      <Tailwind>
        <Head />

        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <Section>
              <Row>
                {headingStructure.map(({ get, title }) => (
                  <Column key={title}>
                    <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
                      {title}
                    </Text>
                    <Text className="mt-0 mr-4">{get(order)}</Text>
                  </Column>
                ))}
              </Row>
            </Section>

            <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
              {order.orderItems.map((product) => (
                <Row key={product.productId} className="mt-8">
                  <Column className="w-20">
                    <Img
                      width={80}
                      alt={product.name}
                      src={product.image}
                      className="rounded"
                    />
                  </Column>

                  <Column className="align-top">
                    {product.name} x {product.qty}
                  </Column>

                  <Column align="right" className="align-top">
                    {formatUSDPrice(product.price)}
                  </Column>
                </Row>
              ))}

              {priceRowsStructure.map(({ name, key }) => (
                <Row key={name} className="py-1">
                  <Column align="right">{name}: </Column>
                  <Column align="right" width={70} className="align-top">
                    <Text className="m-0"> {formatUSDPrice(order[key])}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
export default PurchaseReceiptEmail;
