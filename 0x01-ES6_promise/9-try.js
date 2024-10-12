export default function guardrail(mathFunction) {
  const queue = [];
  try {
    queue.push(mathFunction());
  } catch (error) {
    queue.push(`Error: ${error.message.split('\n')[0]}`);
  } finally {
    queue.push('Guardrail was processed');
  }

  return queue;
}
