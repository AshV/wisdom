/**
 * 9:16 Ultra-HD Quote Card Generator
 *
 * Renders social keepsake graphics via 2D Canvas with:
 * - Crisp Devanagari & Latin font ligature support
 * - Dynamic font sizing according to quote length
 * - Mood-responsive cosmic radial background aura
 * - Bottom branding watermark
 * - PNG download & clipboard image copy
 */

import { MOODS } from './data.js';

export class QuoteCardGenerator {
  constructor() {
    this.width = 1080;
    this.height = 1920;
  }

  render(targetCanvas, quote, options = {}) {
    const canvas = targetCanvas;
    const ctx = canvas.getContext('2d');
    const mood = MOODS[quote.mood] || MOODS.reflective;
    const branding = options.brandingText || 'wisdom.reels';

    canvas.width = this.width;
    canvas.height = this.height;

    // 1. Deep Midnight Cosmic Background
    ctx.fillStyle = '#090a10';
    ctx.fillRect(0, 0, this.width, this.height);

    // 2. Radial Mood Aura Glow
    const cx = this.width / 2;
    const cy = this.height * 0.45;
    const auraRadius = this.width * 0.85;
    const auraGrad = ctx.createRadialGradient(cx, cy, 50, cx, cy, auraRadius);
    auraGrad.addColorStop(0, mood.glow || 'rgba(99, 102, 241, 0.45)');
    auraGrad.addColorStop(0.55, mood.glowSoft || 'rgba(99, 102, 241, 0.12)');
    auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = auraGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // 3. Subtle Frosted Border Frame
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, this.width - 100, this.height - 100);

    // Corner Accents
    const cornerSize = 24;
    ctx.strokeStyle = mood.accent || '#a78bfa';
    ctx.lineWidth = 4;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(50, 50 + cornerSize); ctx.lineTo(50, 50); ctx.lineTo(50 + cornerSize, 50);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(this.width - 50 - cornerSize, 50); ctx.lineTo(this.width - 50, 50); ctx.lineTo(this.width - 50, 50 + cornerSize);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(50, this.height - 50 - cornerSize); ctx.lineTo(50, this.height - 50); ctx.lineTo(50 + cornerSize, this.height - 50);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(this.width - 50 - cornerSize, this.height - 50); ctx.lineTo(this.width - 50, this.height - 50); ctx.lineTo(this.width - 50, this.height - 50 - cornerSize);
    ctx.stroke();
    ctx.restore();

    // 4. Header Top Badge / Star
    ctx.save();
    ctx.fillStyle = mood.accent || '#f59e0b';
    ctx.font = 'bold 36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦', cx, 140);

    ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.letterSpacing = '4px';
    const catText = (quote.category || 'WISDOM').toUpperCase();
    ctx.fillText(catText, cx, 185);
    ctx.restore();

    // 5. Quote Text Wrapping & Adaptive Typography
    ctx.save();
    const isHindi = quote.lang === 'hi' || /[\u0900-\u097F]/.test(quote.content);
    const content = quote.content;
    const len = content.length;

    let fontSize = 68;
    let lineHeight = 98;
    if (len < 55) {
      fontSize = 76;
      lineHeight = 110;
    } else if (len < 120) {
      fontSize = 62;
      lineHeight = 90;
    } else if (len < 200) {
      fontSize = 50;
      lineHeight = 74;
    } else {
      fontSize = 42;
      lineHeight = 64;
    }

    const fontFamily = isHindi
      ? '"Rozha One", "Noto Serif Devanagari", serif'
      : '"Playfair Display", "Cormorant Garamond", Georgia, serif';

    ctx.font = `italic ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = '#fbfbfe';
    ctx.textAlign = 'center';

    const maxTextWidth = this.width - 240;
    const words = content.split(' ');
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine ? currentLine + ' ' + word : word;
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth > maxTextWidth && i > 0) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    // Calculate vertical centering
    const totalBlockHeight = lines.length * lineHeight;
    let startY = (this.height * 0.44) - (totalBlockHeight / 2);

    // Draw quote marks
    ctx.fillStyle = mood.accent || '#a78bfa';
    ctx.font = `bold ${fontSize * 1.2}px serif`;
    ctx.fillText('“', cx, startY - 20);

    ctx.fillStyle = '#fbfbfe';
    ctx.font = `500 ${fontSize}px ${fontFamily}`;
    for (let line of lines) {
      ctx.fillText(line, cx, startY + fontSize * 0.8);
      startY += lineHeight;
    }
    ctx.restore();

    // 6. Ornamental Divider
    ctx.save();
    const divY = Math.max(startY + 40, this.height * 0.72);
    const divGrad = ctx.createLinearGradient(cx - 150, divY, cx + 150, divY);
    divGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    divGrad.addColorStop(0.5, mood.accent || 'rgba(255, 255, 255, 0.7)');
    divGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 150, divY);
    ctx.lineTo(cx + 150, divY);
    ctx.stroke();
    ctx.restore();

    // 7. Author Attribution & Source Work
    ctx.save();
    const authorY = divY + 70;
    ctx.font = `600 44px ${isHindi ? '"Noto Serif Devanagari", serif' : '"Playfair Display", serif'}`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(quote.author, cx, authorY);

    if (quote.sourceWork) {
      ctx.font = 'italic 28px -apple-system, BlinkMacSystemFont, "Inter", Georgia, serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.fillText(quote.sourceWork, cx, authorY + 48);
    }
    ctx.restore();

    // 8. Bottom Branding Watermark
    ctx.save();
    const bottomY = this.height - 90;
    ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '3px';
    ctx.fillText(`✦  ${branding.toUpperCase()}  ✦`, cx, bottomY);
    ctx.restore();
  }

  async toBlob(targetCanvas) {
    return new Promise((resolve) => {
      targetCanvas.toBlob((blob) => resolve(blob), 'image/png', 0.95);
    });
  }

  async download(targetCanvas, quote) {
    const slug = (quote.authorSlug || 'quote') + '-' + quote.id;
    const blob = await this.toBlob(targetCanvas);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wiz-${slug}-card.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async copyToClipboard(targetCanvas) {
    const blob = await this.toBlob(targetCanvas);
    if (!navigator.clipboard || !navigator.clipboard.write) {
      throw new Error('Clipboard API not supported');
    }
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
  }
}

export const cardGenerator = new QuoteCardGenerator();
