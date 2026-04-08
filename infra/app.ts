import * as cdk from 'aws-cdk-lib'

import { NeuronStack } from './stack'

const app = new cdk.App()

new NeuronStack(app, 'Neuron', {
  env: {
    region: 'eu-central-1',
  },
})
