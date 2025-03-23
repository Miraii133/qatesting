export async function GET(req) {
  if (Math.random() > 0.5) {
    return new Response(
      JSON.stringify({ error: "Random server error occurred" }),
      { status: 500 }
    );
  }
  return new Response(
    JSON.stringify([{ name: "Item 1" }, { name: "Item 2" }]),
    { status: 200 }
  );
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.name) {
      return new Response(
        JSON.stringify({
          message: "Item added successfully",
          id: Math.random(),
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ id: Math.random(), name: body.item }),
        { status: 201 }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Malformed request" }), {
      status: 400,
    });
  }
}
