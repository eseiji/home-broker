export const kafkaConfig = {
  brokers: process.env.KAFKA_BROKERS || 'localhost:9094',
  clientId: process.env.KAFKA_CLIENT_ID || 'nestjs-api',
  groupId: process.env.KAFKA_GROUP_ID || 'nestjs-api-group',
};