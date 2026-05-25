export async function POST(request) {
  try {
    const body = await request.json()
    const { fullName, email, companyName, businessType, currentERP, message } = body

    if (!fullName || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const ALLOWED_BUSINESS_TYPES = ['E-commerce', 'Retail', 'Wholesale', 'Services', 'Other']
    if (businessType && !ALLOWED_BUSINESS_TYPES.includes(businessType)) {
      return Response.json({ error: 'Invalid business type' }, { status: 400 })
    }

    const fields = {
      'Full Name': fullName,
      'Business Email': email,
      'Company Name': companyName,
      'Message': message,
      'Status': 'New',
    }

    if (businessType) fields['Business Type'] = businessType
    if (currentERP) fields['Current ERP'] = currentERP

    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(process.env.AIRTABLE_TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Airtable error:', error)
      return Response.json({ error: 'Failed to submit to Airtable' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Unexpected error in /api/contact:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
