import { openai } from '../ai'
import type { ToolFn } from '../../types'
import { z } from 'zod'

export const generateImageToolDefinition = {
  name: 'generate_image',
  parameters: z
    .object({
      prompt: z
        .string()
        .describe(
          'The prompt to use to generate the image with a diffusion model image generator like Dall-E'
        ),
    })
    .describe('Generates an image and returns the url of the image.'),
}

type Args = z.infer<typeof generateImageToolDefinition.parameters>

export const generateImage: ToolFn<Args, string> = async ({
  toolArgs,
  userMessage,
}) => {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: toolArgs.prompt,
    n: 1,
    size: '1024x1024',
  })

  const image = response?.data?.[0]
  if (!image?.url) {
    throw new Error('Image generation failed: no image URL returned')
  }

  const imageUrl = image.url

  return imageUrl
}
