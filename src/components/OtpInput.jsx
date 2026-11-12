import { useRef } from 'react';

function OtpInput({ value = '', onChange, length = 6, disabled = false }) {
  const inputRefs = useRef([]);
  const characters = value.split('');

  function handleChange(index, inputValue) {
    const character = inputValue
      .replace(/[^a-z0-9]/gi, '')
      .slice(-1)
      .toUpperCase();
    const updatedCharacters = [...characters];
    updatedCharacters[index] = character;
    onChange(updatedCharacters.join('').slice(0, length));

    if (character && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(event) {
    event.preventDefault();
    const pastedCode = event.clipboardData
      .getData('text')
      .replace(/[^a-z0-9]/gi, '')
      .slice(0, length)
      .toUpperCase();
    onChange(pastedCode);

    const nextIndex = Math.min(pastedCode.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  }

  function handleKeyDown(index, event) {
    if (event.key === 'Backspace' && !characters[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  return (
    <div className="flex gap-3">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(element) => { inputRefs.current[index] = element; }}
          type="text"
          inputMode="text"
          autoComplete="one-time-code"
          autoCapitalize="characters"
          maxLength={1}
          value={characters[index] || ''}
          onChange={(event) => handleChange(index, event.target.value)}
          onPaste={handlePaste}
          onKeyDown={(event) => handleKeyDown(index, event)}
          disabled={disabled}
          aria-label={`OTP character ${index + 1}`}
          className="h-12 w-12 rounded-lg border border-slate-300 text-center text-lg font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-100"
        />
      ))}
    </div>
  );
}

export default OtpInput;
