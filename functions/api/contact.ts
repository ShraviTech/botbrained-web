interface Env {
  RESEND_API_KEY: string
}

interface ContactBody {
  name: string
  phone: string
  message: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const headers = {
    'Access-Control-Allow-Origin': 'https://botbrained.com',
    'Content-Type': 'application/json',
  }

  let body: ContactBody
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers })
  }

  const { name, phone, message } = body
  if (!name?.trim() || !phone?.trim() || !message?.trim()) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400, headers })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'BotBrained Contact <info@botbrained.com>',
      to: ['info@botbrained.com'],
      reply_to: phone.includes('@') ? phone : undefined,
      subject: `New enquiry from ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>WhatsApp:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message.replace(/\n/g, '<br>')}</blockquote>
      `,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return new Response(JSON.stringify({ error: err }), { status: 502, headers })
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers })
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': 'https://botbrained.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
